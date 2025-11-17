"use client";

import { create } from "zustand";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role, Query } from "appwrite";
import type { User } from "../lib/useAuth";

// 🔹 Invoice Item type
export type InvoiceItem = {
  name: string;
  quantity: number;
  rate: number;
  amount: number;
};

// 🔹 Invoice data type
export type Invoice = {
  $id?: string;
  userId: string;
  invoiceID: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  businessName: string;
  businessAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
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
  fetchInvoices: (user: User) => Promise<void>;
  addInvoice: (user: User, inv: Omit<Invoice, "$id">) => Promise<void>;
  markPaid: (id: string) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  totals: () => {
    totalRevenue: number;
    totalVAT: number;
    pending: number;
    totalInvoices: number;
  };
};

// ✅ Zustand store
export const useInvoiceStore = create<State>((set, get) => ({
  invoices: [],
  loading: false,

  // 🔹 Fetch all invoices for current user
  fetchInvoices: async (user) => {
    if (!user) return;
    set({ loading: true });
    try {
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID!,
        [Query.equal("userId", user.$id)]
      );


      // 🔹 Map Appwrite documents to Invoice type safely
      const invoices = (res.documents ?? []).map((d: any) => ({
        $id: d.$id,
        userId: d.userId,
        invoiceID: d.invoiceID,
        invoiceNumber: d.invoiceNumber,
        clientName: d.clientName,
        clientEmail: d.clientEmail,
        clientAddress: d.clientAddress,
        businessName: d.businessName,
        businessAddress: d.businessAddress,
        items: Array.isArray(d.items) ? d.items : [],
        subtotal: Number(d.subtotal),
        discount: Number(d.discount),
        tax: Number(d.tax),
        vatAmount: Number(d.vatAmount) || 0, // ✅ added
        total: Number(d.total),
        dueDate: String(d.dueDate),
        status: d.status === "paid" ? "paid" : "unpaid",
        createdAt: String(d.createdAt),
        paidAt: d.paidAt ? String(d.paidAt) : undefined,
      })) as Invoice[];

      set({ invoices });
    } catch (err) {
      console.error("❌ Failed to fetch invoices:", err);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Add new invoice (with row-level permissions)
  addInvoice: async (user, inv) => {
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
        invoices: s.invoices.map((i) =>
          i.$id === id ? (updated as any) : i
        ),
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
      set((s) => ({
        invoices: s.invoices.filter((i) => i.$id !== id),
      }));
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
      .reduce((s, a) => s + a.tax, 0);
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