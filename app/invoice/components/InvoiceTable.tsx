"use client";

import { useInvoiceStore } from "../../stores/useInvoices";
import InvoiceRow from "./InvoiceRow";

type Props = {
  search: string;
};

export default function InvoiceTable({ search }: Props) {
  const { invoices, loading } = useInvoiceStore();

  const filtered = invoices.filter(
    (inv) =>
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center py-4">Loading invoices...</p>;

  if (!filtered.length) return <p className="text-center py-4 text-gray-500">Create an invoice.</p>;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name/Client</th>
            <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                        <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Order/type</th>
            <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-center py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filtered.map((invoice) => (
            <InvoiceRow key={invoice.$id} invoice={invoice} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
