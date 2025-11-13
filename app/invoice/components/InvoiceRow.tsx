export default function InvoiceRow({ invoice }) {
  const statusColor = invoice.status === "paid"
    ? "bg-green-100 text-green-600"
    : "bg-red-100 text-red-600";

  return (
    <tr>
      <td className="px-6 py-4">{invoice.id}</td>
      <td className="px-6 py-4">{invoice.userName}</td>
      <td className="px-6 py-4">
        <span className={`px-4 py-2 rounded-sm text-xs font-medium ${statusColor}`}>
          {invoice.status === "paid" ? "Paid" : "Unpaid"}
        </span>
      </td>
      <td className="px-6 py-4">{invoice.amount}</td>
    </tr>
  );
}
