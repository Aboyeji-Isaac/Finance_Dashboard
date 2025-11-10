export default function RecentInvoices() {
  const invoices = [
    { name: "Gadget Gallery LTD", code: "MGL524874", date: "14 Apr 2022", amount: "$420.84", status: "Pending" },
    { name: "Gadget Gallery LTD", code: "MGL524874", date: "14 Apr 2022", amount: "$420.84", status: "Pending" },
    { name: "Gadget Gallery LTD", code: "MGL524874", date: "14 Apr 2022", amount: "$420.84", status: "Pending" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Recent Invoice</h3>
        <a href="#" className="text-green-600 text-sm font-medium hover:underline">View All</a>
      </div>

      <table className="w-full text-left">
        <thead className="text-gray-500 text-sm">
          <tr>
            <th className="pb-3">Name/Client</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Orders/Type</th>
            <th className="pb-3">Amount</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {invoices.map((inv, i) => (
            <tr key={i} className="border-t border-gray-100">
              <td className="py-3">{inv.name}<p className="text-gray-400 text-xs">Inv: {inv.code}</p></td>
              <td>{inv.date}</td>
              <td>20</td>
              <td className="font-semibold">{inv.amount}</td>
              <td><span className="text-amber-500 bg-amber-50 px-3 py-1 rounded-full text-xs">{inv.status}</span></td>
              <td className="text-gray-400">•••</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
