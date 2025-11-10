export default function DashboardStats() {
  const stats = [
    { title: "Total Invoice", value: "$5240.21", color: "bg-gray-900", text: "text-white" },
    { title: "Amount Paid", value: "$250.80", color: "bg-gray-50", text: "text-gray-800" },
    { title: "Pending Payment", value: "$550.25", color: "bg-gray-50", text: "text-gray-800" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map(({ title, value, color, text }) => (
        <div key={title} className={`p-6 rounded-2xl shadow-sm ${color}`}>
          <p className={`text-sm font-medium ${text}`}>{title}</p>
          <h3 className={`text-2xl font-semibold mt-2 ${text}`}>{value}</h3>
        </div>
      ))}
    </div>
  );
}
