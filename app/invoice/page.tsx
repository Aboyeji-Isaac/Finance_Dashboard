"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../lib/useAuth";
import { useInvoiceStore } from "../stores/useInvoices";
import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceTable from "./components/InvoiceTable";

export default function InvoicePage() {
  const { user, loading: authLoading } = useAuth();
  const { fetchInvoices } = useInvoiceStore();
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) fetchInvoices(user);
  }, [user, fetchInvoices]);

  // ✅ Generate invoice ID (MGL + 6 digits)
  const generateInvoiceId = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `MGL${random}`;
  };

  // ✅ Updated create handler
  const handleCreate = () => {
    const invoiceId = generateInvoiceId();
    router.push(`/invoice/create?invoiceId=${invoiceId}`);
  };

  if (authLoading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <InvoiceHeader
        search={search}
        setSearch={setSearch}
        onCreate={handleCreate}
      />

      {/* <InvoiceTable search={search} /> */}
    </div>
  );
}
