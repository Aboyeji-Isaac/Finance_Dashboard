interface StatusBadgeProps {
  status: "Pending" | "Paid" | "Unpaid"
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    Pending: "bg-orange-100 text-orange-700",
    Paid: "bg-green-100 text-green-700",
    Unpaid: "bg-red-100 text-red-700",
  }

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  )
}
