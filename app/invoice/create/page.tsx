"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Eye, Download } from "lucide-react";
import { useInvoiceStore } from "../../stores/useInvoices";
import useAuth from "../../lib/useAuth";
import { databases } from "../../lib/appwrite";
import { Query } from "appwrite";

type Item = {
  id: number;
  name: string;
  order: number | string;
  rate: number | string;
  amount: number;
};

const INITIAL_MOCK = {
  invoiceNumber: "MGL524874",
  businessName: "Maglo",
  businessEmail: "sales@maglo.com",
  businessAddresses: [
    "52, Makudi street",
    "Ebute Meta, Mainland",
    "Lagos, Nigeria",
  ],
  invoiceId: "MAG 2541420",
  issuedDate: "2022-04-10",
  dueDate: "2022-04-20",
  clientName: "Sajib Rahman",
  clientEmail: "rahmansajib@uihut.com",
  clientAddress: "3471 Rainy Day Drive",
  clientCity: "Needham, MA 02192",
  clientBusinessName: "UIHUT Agency LTD",
  clientBusinessAddress: "3471 Rainy Day Drive Tulsa, USA",
  items: [
    { id: 1, name: "Iphone 13 Pro Max", order: 1, rate: 244, amount: 244.0 },
    { id: 2, name: "Netflix Subscription", order: 1, rate: 420, amount: 420.0 },
  ],
  subtotal: 664.0,
  total: 664.0,
  invoiceDate: "2022-04-14",
  invoiceDueDate: "2022-04-20",
};

export default function CreateInvoicePage() {
  const { user } = useAuth();
  const { addInvoice } = useInvoiceStore();

  // --- Fixed rates
  const TAX_PERCENT = 7.5;
  const DISCOUNT_PERCENT = 2;


  
  // --- Form state (prefilled with mock)
  const [] = useState(INITIAL_MOCK);
  const [invoiceNumber] = useState(INITIAL_MOCK.invoiceNumber);
  const [invoiceId] = useState(INITIAL_MOCK.invoiceId);

  const [clientName, setClientName] = useState(INITIAL_MOCK.clientName);
  const [clientEmail, setClientEmail] = useState(INITIAL_MOCK.clientEmail);
  const [clientAddress, setClientAddress] = useState(INITIAL_MOCK.clientAddress);
  const [clientCity, setClientCity] = useState(INITIAL_MOCK.clientCity);
  const [clientBusinessName, setclientBusinessName] = useState(INITIAL_MOCK.clientBusinessName);
  const [clientBusinessAddress, setclientBusinessAddress] = useState(
    INITIAL_MOCK.clientBusinessAddress
  );

  const [items, setItems] = useState<Item[]>(
    INITIAL_MOCK.items.map((it) => ({
      id: it.id,
      name: it.name,
      order: it.order,
      rate: it.rate,
      amount: it.amount,
    }))
  );

  const [discount, setDiscount] = useState<number>(0);
  const [taxAdded, setTaxAdded] = useState(false);
  const [discountAdded, setDiscountAdded] = useState(false);

  const [invoiceDate, setInvoiceDate] = useState(INITIAL_MOCK.invoiceDate);
  const [invoiceDueDate, setInvoiceDueDate] = useState(
    INITIAL_MOCK.invoiceDueDate
  );

  const [status, setStatus] = useState<"paid" | "unpaid">("unpaid");
  const [issuedDate, setIssuedDate] = useState("");

  useEffect(() => {
    const todayIso = new Date().toISOString().split("T")[0];
    setIssuedDate(todayIso);
    // default invoice dates if empty
    if (!invoiceDate) setInvoiceDate(todayIso);
    if (!invoiceDueDate) setInvoiceDueDate(todayIso);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derived: subtotal based on items
  const subtotal = useMemo(() => {
    // ensure each item's amount reflects order * rate
    const computed = items.reduce((acc, it) => {
      const order = Number(it.order);
      const rate = Number(it.rate);
      const amount = Number(it.amount) || order * rate;
      return acc + amount;
    }, 0);
    return Number(computed.toFixed(2));
  }, [items]);

  // const vatAmount = useMemo(
  //   () => Number(((subtotal * VAT_PERCENT) / 100).toFixed(2)),
  //   [subtotal]
  // );
  const taxAmount = useMemo(
    () => (taxAdded ? Number(((subtotal * TAX_PERCENT) / 100).toFixed(2)) : 0),
    [subtotal, taxAdded]
  );
  const total = useMemo(
    () => Number((subtotal + taxAmount - discount).toFixed(2)),
    [subtotal, taxAmount, discount]
  );

  // Item helpers
  const handleItemChange = (id: number, field: keyof Item, value: any) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const next = { ...it, [field]: value };
        // recalc amount when order or rate changes
        const order = Number(next.order) || 0;
        const rate = Number(next.rate) || 0;
        next.amount = Number((order * rate).toFixed(2));
        return next;
      })
    );
  };

  const handleAddItem = () => {
    const nextId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems((prev) => [
      ...prev,
      { id: nextId, name: "", order: 1, rate: 0, amount: 0, status: "unpaid" },
    ]);
  };

    const handleTogglePaid = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, paid: !item.paid } : item
      )
    );
  };




  const handleRemoveItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddDiscount = () => {
    if (!discountAdded) {
      setDiscount(DISCOUNT_PERCENT); // example fixed discount
      setDiscountAdded(true);
    } else {
      setDiscount(0);
      setDiscountAdded(false);
    }
  };

  const handleAddTax = () => {
    setTaxAdded((prev) => !prev);
  };

  const formatCurrency = (n: number | string) =>
    `$${Number(n || 0).toFixed(2)}`;

    const [business, setBusiness] = useState<any>(null);

useEffect(() => {
  if (!user) return;

  async function loadBusiness() {
    try {
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        "business_profiles",
        [Query.equal("userId", user.$id)]
      );

      if (res.documents.length > 0) {
        setBusiness(res.documents[0]);
      }
    } catch (err) {
      console.error("Failed to load business:", err);
    }
  }

  loadBusiness();
}, [user]);


    const businessName = business?.businessName || "";
    const businessEmail = business?.businessEmail || "";
    const businessAddresses = business
      ? [
          business.street,
          `${business.lga}, ${business.city}`,
          `${business.state}, ${business.country}`
        ]
      : [];
      

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to create an invoice.");
      return;
    }


    const invoice = {
      userId: user.$id,

      invoiceNumber,
      invoiceId,
      clientName,
      clientEmail,
      clientAddress,
      clientCity,
      clientBusinessName,
      clientBusinessAddress,
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        order: it.order,
        rate: it.rate,
        amount: it.amount,
      })),
      subtotal,
      discount,
      tax: taxAmount,
      vatPercent: VAT_PERCENT,
      vatAmount,
      total,
      dueDate: invoiceDueDate,
      status,
      createdAt: issuedDate,
    };

    await addInvoice(user, invoice);
    alert("✅ Invoice created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Company Info */}
            <div className="bg-gray-900 text-white rounded-2xl p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      <img src="/assets/icons/invi/businessLogo.svg" className="w-auto h-auto" alt="Login" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold">{businessName}</h2>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">{businessEmail}</p>
                  </div>
                </div>
                <div className="text-right text-xs sm:text-sm space-y-0.5 sm:space-y-1 flex-shrink-0">
                  {businessAddresses.map((a, idx) => (
                    <p key={idx} className="text-gray-300">{a}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="bg-gray-100 rounded-xl p-4 sm:p-6 lg:p-8 grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-gray-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Invoice Number</h3>
                <p className="text-gray-900 font-semibold text-base sm:text-lg mb-3 sm:mb-4">{invoiceId}</p>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">Issued Date: <span className="text-gray-900 font-medium">{issuedDate}</span></p>
                <p className="text-gray-600 text-xs sm:text-sm">Due Date: <span className="text-gray-900 font-medium">{invoiceDueDate}</span></p>
              </div>
              <div>
                <h3 className="text-gray-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Billed to</h3>
                <p className="text-gray-900 font-semibold text-base sm:text-lg mb-3 sm:mb-4">{clientName}</p>
                <p className="text-gray-600 text-xs sm:text-sm mb-1">
                  <input
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-600 text-xs sm:text-sm"
                  />
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <input
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-600 text-xs sm:text-sm"
                  />
                </p>
              </div>
            </div>

            {/* Item Details */}
            <div>
              <div className="mb-4">
                <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-1">Item Details</h3>
                <p className="text-gray-500 text-xs sm:text-sm">Details item with more info</p>
              </div>

              <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-xs">ITEM</th>
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-xs">ORDER/TYPE</th>
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-xs">RATE</th>
                      <th className="text-right py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-xs">AMOUNT</th>
                      <th className="py-3 sm:py-4 px-2 sm:px-2 text-gray-600 font-semibold text-xs">STATUS</th>
                      <th className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600 font-semibold text-xs"> </th>
                    </tr>
                  </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-900 font-medium text-xs sm:text-sm">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                              className="w-full bg-transparent focus:outline-none text-gray-900 text-xs sm:text-sm"
                              placeholder="Item name"
                            />
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-700 text-xs sm:text-sm">
                            <input
                              type="number"
                              min={0}
                              value={item.order}
                              onChange={(e) => handleItemChange(item.id, "order", Number(e.target.value))}
                              className="w-16 p-1 border rounded text-gray-700 text-xs sm:text-sm"
                            />
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-700 text-xs sm:text-sm">
                            <input
                              type="number"
                              min={0}
                              value={item.rate}
                              onChange={(e) => handleItemChange(item.id, "rate", Number(e.target.value))}
                              className="w-24 p-1 border rounded text-gray-700 text-xs sm:text-sm"
                            />
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-900 font-medium text-right text-xs sm:text-sm">
                            {formatCurrency(item.amount)}
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4 text-right flex gap-2 justify-end">
                            <select
                              value={item.status}
                              onChange={(e) => handleItemChange(item.id, "status", e.target.value)}
                              className="border rounded px-2 py-1 text-xs sm:text-sm text-gray-700"
                            >
                              <option value="paid">Paid</option>
                              <option value="unpaid">Unpaid</option>
                              <option value="pending">Pending</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:underline text-xs"
                            >
                              Remove
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>

                </table>
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="mt-4 sm:mt-6 text-green-600 hover:text-green-700 font-semibold text-xs sm:text-sm transition"
              >
                Add Item
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="w-full sm:w-80 bg-white rounded-lg border border-gray-200 p-3">
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">Subtotal</span>
                    <span className="text-gray-900 font-semibold text-xs sm:text-sm">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">Discount</span>
                    <button type="button" onClick={handleAddDiscount} className="text-green-600 hover:text-green-700 font-semibold text-xs transition">
                      {discountAdded ? `-${formatCurrency(discount)}` : "Add"}
                    </button>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">Tax</span>
                    <button type="button" onClick={handleAddTax} className="text-green-600 hover:text-green-700 font-semibold text-xs transition">
                      {taxAdded ? formatCurrency(taxAmount) : "Add"}
                    </button>
                  </div>
                  <div className="flex justify-between items-center py-2 sm:py-3">
                    <span className="text-gray-900 font-bold text-xs sm:text-sm">Total</span>
                    <span className="text-gray-900 font-bold text-sm sm:text-base">{formatCurrency(total)}</span>
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
                  <input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="text-gray-900 font-semibold text-xs sm:text-sm truncate w-full bg-transparent focus:outline-none"
                  />
                  <input
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="text-gray-500 text-xs truncate w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-gray-900 font-bold text-xs sm:text-sm mb-1 sm:mb-2">{clientBusinessName}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">{clientBusinessAddress}</p>
              </div>

              <button
                type="button"
                onClick={() => alert("Add Customer clicked")}
                className="w-full py-2 text-green-600 hover:bg-green-50 rounded-lg font-semibold text-xs sm:text-sm transition border border-green-200"
              >
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
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="flex-1 px-2 sm:px-3 py-2 border border-gray-00 rounded-lg text-gray-900 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-medium text-xs sm:text-sm block mb-2">Due Date</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={invoiceDueDate}
                      onChange={(e) => setInvoiceDueDate(e.target.value)}
                      className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
              >
                Send Invoice
              </button>

              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => alert("Preview clicked")}
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-green-600 hover:text-green-700 font-semibold text-xs sm:text-sm transition"
                >
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Download clicked")}
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-green-600 hover:text-green-700 font-semibold text-xs sm:text-sm transition"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
