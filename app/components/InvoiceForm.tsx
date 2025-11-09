"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInvoiceStore } from "../stores/useInvoices";

type FormValues = {
  clientName: string;
  clientEmail: string;
  amount: number;
  vatPercent: number;
  dueDate: string;
};

export default function InvoiceForm() {
  const addInvoice = useInvoiceStore((s) => s.addInvoice);
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: { amount: 0, vatPercent: 7 },
  });

  const amount = watch("amount");
  const vatPercent = watch("vatPercent");

  useEffect(() => {
    setValue("vatPercent", vatPercent);
  }, [vatPercent, setValue]);

  const onSubmit = (data: FormValues) => {
    const vatAmount = Number((data.amount * (data.vatPercent / 100)).toFixed(2));
    const total = Number((data.amount + vatAmount).toFixed(2));
    addInvoice({
      id: String(Date.now()),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      amount: data.amount,
      vatPercent: data.vatPercent,
      vatAmount,
      total,
      dueDate: data.dueDate,
      status: "unpaid",
      createdAt: new Date().toISOString(),
    });
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
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
          Save Invoice
        </button>
      </div>
    </form>
  );
}
