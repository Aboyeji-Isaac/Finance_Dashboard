"use client";

import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (val: string) => void;
  onCreate: () => void;
};

export default function InvoiceHeader({ search, setSearch, onCreate }: Props) {
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Search Bar */}
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search invoices"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onCreate}
          className="bg-lime-400 hover:bg-lime-500 text-black px-3 py-3 rounded-lg font-semibold flex items-center gap-2"
        >
          <img src="/assets/icons/invi/createInvoice.svg" alt="Create Invoice" className="w-5 h-5" />
          <span>Create Invoice</span>
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded-lg flex gap-1 items-center hover:bg-gray-100">
        <img src="/assets/icons/invi/filter.svg" alt="Create Invoice" className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
}
