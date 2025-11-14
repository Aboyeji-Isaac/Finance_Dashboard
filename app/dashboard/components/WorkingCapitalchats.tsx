"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Apr 14", income: 4000, expense: 2400 },
  { date: "Apr 15", income: 5000, expense: 3000 },
  { date: "Apr 16", income: 6000, expense: 3500 },
  { date: "Apr 17", income: 5500, expense: 4000 },
  { date: "Apr 18", income: 4800, expense: 4200 },
  { date: "Apr 19", income: 4700, expense: 4100 },
];

// ✅ Custom tooltip for better control
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/90 text-white px-4 py-3 rounded-xl shadow-lg backdrop-blur-md">
        <p className="font-medium text-sm mb-1">{label}</p>
        <p className="text-emerald-400 text-xs">
          Income: ₦{payload[0].value.toLocaleString()}
        </p>
        <p className="text-lime-400 text-xs">
          Expense: ₦{payload[1].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function WorkingCapitalChart() {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
          Working Capital
        </h3>
        <select className="border border-gray-200 dark:border-gray-700 bg-transparent rounded-lg px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 focus:outline-none">
          <option>Last 7 days</option>
          <option>Last month</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0.9} />
            </linearGradient>

            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a3e635" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#a3e635" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />

          {/* Axes */}
          <XAxis
            dataKey="date"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="url(#incomeGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, stroke: "#16a34a", strokeWidth: 2, fill: "#fff" }}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="url(#expenseGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, stroke: "#a3e635", strokeWidth: 2, fill: "#fff" }}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
