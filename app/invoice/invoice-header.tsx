"use client"

import { Search, LayoutGrid, Filter } from "lucide-react"
import { useState } from "react"

export default function InvoiceHeader() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Search Box */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search invoices"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors">
          <LayoutGrid className="w-5 h-5" />
          <span>Create Invoice</span>
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  )
}
