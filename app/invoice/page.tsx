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

  const handleCreate = () => router.push("/invoice/create");

  if (authLoading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <InvoiceHeader search={search} setSearch={setSearch} onCreate={handleCreate} />
      <InvoiceTable search={search} />
    </div>
  );
}
