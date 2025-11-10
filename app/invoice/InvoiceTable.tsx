"use client";

import InvoiceRow from "./invoiceRow";
import { useInvoiceStore } from "../stores/useInvoices" // ✅ use your store

export default function InvoiceTable() {
  const { invoices, loading } = useInvoiceStore();

  if (loading) {
    return <p className="text-center py-4">Loading invoices...</p>;
  }

  if (!invoices.length) {
    return <p className="text-center py-4 text-gray-500">No invoices found</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Client Name
            </th>
            <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Due Date
            </th>
            <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="text-center py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <InvoiceRow key={invoice.$id} invoice={invoice} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
