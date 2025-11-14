'use client'

import Invoice from '../components/InvoiceRow'
import { Eye, Download } from 'lucide-react'
import { useInvoiceStore } from "../../stores/useInvoices";
import useAuth from "../../lib/useAuth"

const mockInvoiceData = {
  invoiceNumber: 'MGL524874',
  companyName: 'Maglo',
  companyEmail: 'sales@maglo.com',
  companyAddresses: [
    '1333 Grey Fox Farm Road',
    'Houston, TX 77060',
    'Bloomfield Hills, Michigan(MI), 48301'
  ],
  invoiceId: 'MAG 2541420',
  issuedDate: '10 Apr 2022',
  dueDate: '20 Apr 2022',
  clientName: 'Sajib Rahman',
  clientEmail: 'rahmansajib@uihut.com',
  clientAddress: '3471 Rainy Day Drive',
  clientCity: 'Needham, MA 02192',
  businessName: 'UIHUT Agency LTD',
  businessAddress: '3471 Rainy Day Drive Tulsa, USA',
  items: [
    {
      id: 1,
      name: 'Iphone 13 Pro Max',
      order: '01',
      rate: '$244',
      amount: '$244.00'
    },
    {
      id: 2,
      name: 'Netflix Subscription',
      order: '01',
      rate: '$420',
      amount: '$420.00'
    }
  ],
  subtotal: '$664.00',
  total: '$664.00',
  invoiceDate: '14 Apr 2022',
  invoiceDueDate: '20 Apr 2022'
}

export default function InvoicePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
            New Invoices: <span className="text-gray-600">{mockInvoiceData.invoiceNumber}</span>
          </h1>
          <div className="hidden sm:flex items-center gap-2 md:gap-4 flex-shrink-0">
            <button className="p-1.5 md:p-2 hover:bg-gray-200 rounded-full transition">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-1.5 md:p-2 hover:bg-gray-200 rounded-full transition">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="px-2 md:px-3 py-1.5 md:py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">
              Mahfuzul Nabil ▼
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Company Info */}
            <div className="bg-gray-900 text-white rounded-2xl p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg font-bold text-gray-900">m</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold">Maglo</h2>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">sales@maglo.com</p>
                  </div>
                </div>
                <div className="text-right text-xs sm:text-sm space-y-0.5 sm:space-y-1 flex-shrink-0">
                  <p className="text-gray-300">1333 Grey Fox Farm Road</p>
                  <p className="text-gray-300">Houston, TX 77060</p>
                  <p className="text-gray-300">Bloomfield Hills, Michigan(MI), 48301</p>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="bg-gray-100 rounded-xl p-4 sm:p-6 lg:p-8 grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-gray-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Invoice Number</h3>
                <p className="text-gray-900 font-semibold text-base sm:text-lg mb-3 sm:mb-4">{mockInvoiceData.invoiceId}</p>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">Issued Date: <span className="text-gray-900 font-medium">{mockInvoiceData.issuedDate}</span></p>
                <p className="text-gray-600 text-xs sm:text-sm">Due Date: <span className="text-gray-900 font-medium">{mockInvoiceData.dueDate}</span></p>
              </div>
              <div>
                <h3 className="text-gray-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Billed to</h3>
                <p className="text-gray-900 font-semibold text-base sm:text-lg mb-3 sm:mb-4">{mockInvoiceData.clientName}</p>
                <p className="text-gray-600 text-xs sm:text-sm mb-1">{mockInvoiceData.clientAddress}</p>
                <p className="text-gray-600 text-xs sm:text-sm">{mockInvoiceData.clientCity}</p>
              </div>
            </div>

            {/* Item Details */}
            <div>
              <div className="mb-4">
                <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-1">Item Details</h3>
                <p className="text-gray-500 text-xs sm:text-sm">Details item with more info</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-xs">ITEM</th>
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-xs">ORDER/TYPE</th>
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-xs">RATE</th>
                      <th className="text-right py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-xs">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvoiceData.items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-900 font-medium text-xs sm:text-sm">{item.name}</td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-700 text-xs sm:text-sm">{item.order}</td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-700 text-xs sm:text-sm">{item.rate}</td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-900 font-medium text-right text-xs sm:text-sm">{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button className="mt-4 sm:mt-6 text-green-600 hover:text-green-700 font-semibold text-xs sm:text-sm transition">
                + Add Item
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="w-full sm:w-80">
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">Subtotal</span>
                    <span className="text-gray-900 font-semibold text-xs sm:text-sm">{mockInvoiceData.subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">Discount</span>
                    <button className="text-green-600 hover:text-green-700 font-semibold text-xs transition">Add</button>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">Tax</span>
                    <button className="text-green-600 hover:text-green-700 font-semibold text-xs transition">Add</button>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3">
                    <span className="text-gray-900 font-bold text-xs sm:text-sm">Total</span>
                    <span className="text-gray-900 font-bold text-sm sm:text-base">{mockInvoiceData.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Client Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <h3 className="text-gray-900 font-bold text-base sm:text-lg">Client Details</h3>
                <button className="text-gray-400 hover:text-gray-600 transition flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <span className="text-gray-700 font-bold text-xs sm:text-sm">SR</span>
                </div>
                <div className="min-w-0">
                  <p className="text-gray-900 font-semibold text-xs sm:text-sm truncate">{mockInvoiceData.clientName}</p>
                  <p className="text-gray-500 text-xs truncate">{mockInvoiceData.clientEmail}</p>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-gray-900 font-bold text-xs sm:text-sm mb-1 sm:mb-2">{mockInvoiceData.businessName}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">{mockInvoiceData.businessAddress}</p>
              </div>

              <button className="w-full py-2 text-green-600 hover:bg-green-50 rounded-lg font-semibold text-xs sm:text-sm transition border border-green-200">
                Add Customer
              </button>
            </div>

            {/* Basic Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-4 sm:mb-6">Basic Info</h3>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="text-gray-700 font-medium text-xs sm:text-sm block mb-2">Invoice Date</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={mockInvoiceData.invoiceDate}
                      className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm"
                      readOnly
                    />
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-medium text-xs sm:text-sm block mb-2">Due Date</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={mockInvoiceData.invoiceDueDate}
                      className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm"
                      readOnly
                    />
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button className="w-full bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 sm:py-3 rounded-lg transition text-sm sm:text-base">
                Send Invoice
              </button>

              <div className="flex gap-2 sm:gap-3">
                <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-green-600 hover:text-green-700 font-semibold text-xs sm:text-sm transition">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-green-600 hover:text-green-700 font-semibold text-xs sm:text-sm transition">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
