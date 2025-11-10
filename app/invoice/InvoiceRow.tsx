// import Image from "next/image"
// import StatusBadge from "./status-badge"
// import { MoreVertical } from "lucide-react"
// import type { Invoice } from "../stores/useInvoices";


// interface InvoiceRowProps {
//   invoice: Invoice
// }

// export default function InvoiceRow({ invoice }: InvoiceRowProps) {
//   return (
//     <tr className="hover:bg-gray-50 transition-colors">
//       {/* Client Column */}
//       <td className="py-4 px-4">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
//             {invoice.avatar ? (
//               <Image
//                 src={invoice.avatar || "/placeholder.svg"}
//                 alt={invoice.name}
//                 width={40}
//                 height={40}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-xs font-semibold text-gray-600">{invoice.name.charAt(0)}</span>
//             )}
//           </div>
//           <div className="min-w-0">
//             <p className="font-semibold text-gray-900 truncate">{invoice.name}</p>
//             <p className="text-xs text-gray-500">{invoice.invoiceNumber}</p>
//           </div>
//         </div>
//       </td>

//       {/* Date Column */}
//       <td className="py-4 px-4 hidden md:table-cell">
//         <div className="text-sm font-medium text-gray-900">{invoice.date}</div>
//         <div className="text-xs text-gray-500">{invoice.time}</div>
//       </td>

//       {/* Orders/Type Column */}
//       <td className="py-4 px-4 hidden lg:table-cell">
//         <span className="text-sm text-gray-500">{invoice.ordersType}</span>
//       </td>

//       {/* Amount Column */}
//       <td className="py-4 px-4">
//         <span className="font-semibold text-gray-900">{invoice.amount}</span>
//       </td>

//       {/* Status Column */}
//       <td className="py-4 px-4 hidden sm:table-cell">
//         <StatusBadge status={invoice.status} />
//       </td>

//       {/* Action Column */}
//       <td className="py-4 px-4 text-center">
//         <button className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
//           <MoreVertical className="w-5 h-5" />
//         </button>
//       </td>
//     </tr>
//   )
// }











"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInvoiceStore } from "../stores/useInvoices";
import useAuth from "../lib/useAuth";
import type { Invoice } from "../stores/useInvoices";

type FormValues = {
  clientName: string;
  clientEmail: string;
  amount: number;
  vatPercent: number;
  dueDate: string;
};

export default function InvoiceForm() {
  const addInvoice = useInvoiceStore((s) => s.addInvoice);
  const { user } = useAuth();
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: { amount: 0, vatPercent: 7 },
  });

  const amount = watch("amount") ?? 0;
  const vatPercent = watch("vatPercent") ?? 0;

  useEffect(() => {
    setValue("vatPercent", vatPercent);
  }, [vatPercent, setValue]);

  const onSubmit = async (data: FormValues) => {
    // prevent calling store if user not present
    if (!user) {
      // handle UI feedback as you need (toast/modal)
      console.error("No authenticated user — cannot add invoice.");
      return;
    }

    const vatAmount = Number((data.amount * (data.vatPercent / 100)).toFixed(2));
    const total = Number((data.amount + vatAmount).toFixed(2));

    // Build invoice object matching Omit<Invoice, "$id">
    const invoiceToAdd: Omit<Invoice, "$id"> = {
      userId: user.$id, // <-- required
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      amount: data.amount,
      vatPercent: data.vatPercent,
      vatAmount,
      total,
      dueDate: data.dueDate,
      status: "unpaid",
      createdAt: new Date().toISOString(),
      // paidAt omitted for unpaid invoice
    };

    await addInvoice(user, invoiceToAdd);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input {...register("clientName", { required: true })} placeholder="Client name" className="p-2 border rounded" />
        <input {...register("clientEmail", { required: true })} placeholder="Client email" className="p-2 border rounded" />
        <input type="number" {...register("amount", { valueAsNumber: true })} placeholder="Amount (₦)" className="p-2 border rounded" />
        <input type="number" {...register("vatPercent", { valueAsNumber: true })} placeholder="VAT (%)" className="p-2 border rounded" />
        <input type="date" {...register("dueDate")} className="p-2 border rounded" />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-600">
          VAT: ₦{(amount * (vatPercent / 100)).toFixed(2)} — Total: ₦{(amount + amount * (vatPercent / 100)).toFixed(2)}
        </p>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          disabled={!user} // disable if not signed-in
        >
          Save Invoice
        </button>
      </div>
    </form>
  );
}
