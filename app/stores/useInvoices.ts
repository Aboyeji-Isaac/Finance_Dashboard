"use client";

import { create } from "zustand";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role, Query } from "appwrite";
import useAuth from "../lib/useAuth";

// 🔹 Invoice data type
export type Invoice = {
  $id?: string;
  userId: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  vatPercent: number;
  vatAmount: number;
  total: number;
  dueDate: string;
  status: "paid" | "unpaid";
  createdAt: string;
  paidAt?: string;
};

type State = {
  invoices: Invoice[];
  loading: boolean;
  fetchInvoices: () => Promise<void>;
  addInvoice: (inv: Omit<Invoice, "$id">) => Promise<void>;
  markPaid: (id: string) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  totals: () => {
    totalRevenue: number;
    totalVAT: number;
    pending: number;
    totalInvoices: number;
  };
};

export const useInvoiceStore = create<State>((set, get) => ({
  invoices: [],
  loading: false,

  // 🔹 Fetch all invoices for current user
  fetchInvoices: async () => {
    const { user } = useAuth.getState();
    if (!user) return;

    set({ loading: true });
    try {
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID!,
        [Query.equal("userId", user.$id)]
      );
      set({ invoices: res.documents as Invoice[] });
    } catch (err) {
      console.error("❌ Failed to fetch invoices:", err);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Add new invoice (with row-level permissions)
  addInvoice: async (inv) => {
    const { user } = useAuth.getState();
    if (!user) return;

    try {
      const newInv = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID!,
        ID.unique(),
        inv,
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      set((s) => ({ invoices: [newInv as any, ...s.invoices] }));
    } catch (err) {
      console.error("❌ Failed to add invoice:", err);
    }
  },

  // 🔹 Mark invoice as paid
  markPaid: async (id) => {
    try {
      const now = new Date().toISOString();
      const updated = await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID!,
        id,
        { status: "paid", paidAt: now }
      );

      set((s) => ({
        invoices: s.invoices.map((i) => (i.$id === id ? (updated as any) : i)),
      }));
    } catch (err) {
      console.error("❌ Failed to mark invoice paid:", err);
    }
  },

  // 🔹 Delete invoice
  deleteInvoice: async (id) => {
    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID!,
        id
      );
      set((s) => ({ invoices: s.invoices.filter((i) => i.$id !== id) }));
    } catch (err) {
      console.error("❌ Failed to delete invoice:", err);
    }
  },

  // 🔹 Totals for dashboard cards
  totals: () => {
    const invs = get().invoices;
    const totalRevenue = invs
      .filter((i) => i.status === "paid")
      .reduce((s, a) => s + a.total, 0);
    const totalVAT = invs
      .filter((i) => i.status === "paid")
      .reduce((s, a) => s + a.vatAmount, 0);
    const pending = invs
      .filter((i) => i.status === "unpaid")
      .reduce((s, a) => s + a.total, 0);

    return {
      totalRevenue,
      totalVAT,
      pending,
      totalInvoices: invs.length,
    };
  },
}));
