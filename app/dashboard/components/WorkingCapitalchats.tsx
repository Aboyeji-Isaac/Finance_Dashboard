"use client";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Apr 14", income: 4000, expense: 2400 },
  { date: "Apr 15", income: 5000, expense: 3000 },
  { date: "Apr 16", income: 6000, expense: 3500 },
  { date: "Apr 17", income: 5500, expense: 4000 },
  { date: "Apr 18", income: 4800, expense: 4200 },
  { date: "Apr 19", income: 4700, expense: 4100 },
];

export default function WorkingCapitalChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Working Capital</h3>
        <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm">
          <option>Last 7 days</option>
          <option>Last month</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#16a34a" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#a3e635" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
