"use client";

import React, { useMemo } from "react";
import useAuth from "./lib/useAuth"; // 👈 Add this import
import InvoiceForm from "./components/InvoiceForm";
import InvoiceTable from "./components/InvoiceTable";
import { useInvoiceStore } from "./stores/useInvoices";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { subMonths, format } from "date-fns";

export default function DashboardContent() {
  const { user, logout } = useAuth(); // 👈 Access user + logout
  const totals = useInvoiceStore((s) => s.totals)();
  const invoices = useInvoiceStore((s) => s.invoices);

  const monthlyData = useMemo(() => {
    const months = Array.from({ length: 6 }).map((_, i) => {
      const d = subMonths(new Date(), 5 - i);
      const month = format(d, "MMM");
      return { month, revenue: 0 };
    });

    invoices.forEach((inv) => {
      if (inv.status === "paid") {
        const m = format(new Date(inv.paidAt || inv.createdAt), "MMM");
        const entry = months.find((x) => x.month === m);
        if (entry) entry.revenue += inv.total;
      }
    });

    return months;
  }, [invoices]);

  return (
    <div className="space-y-8">
      {/* 👇 Updated header section */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Finance Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back, {user?.name || "User"} 👋</p>
        </div>
        <button
          onClick={logout}
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm self-start sm:self-auto"
        >
          Logout
        </button>
      </header>

      {/* --- the rest of your dashboard remains exactly as before --- */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Total Revenue</p>
          <h2 className="text-2xl font-bold mt-1">₦{totals.totalRevenue.toFixed(2)}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Total VAT</p>
          <h2 className="text-2xl font-bold mt-1">₦{totals.totalVAT.toFixed(2)}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-slate-500">Pending</p>
          <h2 className="text-2xl font-bold mt-1">₦{totals.pending.toFixed(2)}</h2>
        </div>
      </section>

      {/* Main content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <InvoiceForm />
          <InvoiceTable />
        </div>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Revenue (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Quick Stats</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>Total invoices: {totals.totalInvoices}</li>
              <li>Paid: {invoices.filter((i) => i.status === "paid").length}</li>
              <li>Unpaid: {invoices.filter((i) => i.status === "unpaid").length}</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
