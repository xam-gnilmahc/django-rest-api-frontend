import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../redux";
import { fetchPaymentLogs } from "../redux/slice/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import loadingAnime from "../Lottie/loading.json";
import Lottie from "lottie-react";
import { Bell, BellOff } from "lucide-react";

// Icons
const WalletIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 13h6" />
  </svg>
);
const TransactionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4-4-4-4m8 8l-4-4 4-4" />
  </svg>
);
const RefundIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ProfileIcon = (
  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0113 0" />
  </svg>
);

// ... imports remain the same

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { logs, loading, error } = useSelector((state: RootState) => state.paymentLogs);
  const [dateFilter, setDateFilter] = useState("last7days");
  const [showNotifications, setShowNotifications] = useState(true);

  useEffect(() => {
    dispatch(fetchPaymentLogs());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center pt-16 h-full bg-gray-50">
        <Lottie animationData={loadingAnime} loop className="w-20 h-20" />
        <p className="mt-4 text-gray-700 font-semibold text-lg">Loading dashboard data...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );

  if (!logs)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500">No data found.</p>
      </div>
    );

  const COLORS = ["#4ade80", "#60a5fa", "#a78bfa", "#f87171", "#facc15", "#14b8a6"];
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  const notifications = [
    { user: "John Doe", message: "Payment of $250 completed." },
    { user: "Jane Smith", message: "Refund of $45 issued." },
    { user: "Mike Johnson", message: "New user registration." },
  ];

  const stats = [
    { title: "Total Earned", value: formatCurrency(logs.stats.total_earned), icon: <WalletIcon /> },
    { title: "Total Transactions", value: logs.stats.total_transactions, icon: <TransactionIcon /> },
    { title: "Avg Transaction", value: formatCurrency(logs.stats.average_transaction), icon: <WalletIcon /> },
    { title: "Total Refunded", value: formatCurrency(logs.stats.total_refunded), icon: <RefundIcon /> },
    { title: "Failed Transactions", value: logs.stats.failed_transactions, icon: <TransactionIcon /> },
    { title: "Success Ratio", value: `${(logs.stats.success_ratio * 100).toFixed(2)}%`, icon: <WalletIcon /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6 min-h-screen overflow-auto p-2 bg-gray-50">

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col gap-6">

        {/* HEADER */}
        <header className="flex flex-wrap items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
          <h1 className="text-2xl font-extrabold text-gray-800">Hi, Welcome Back!</h1>
          <div className="flex gap-3 items-center">
            <select
              className="rounded-md px-3 py-1 text-sm font-semibold bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option className="text-gray-800 bg-white" value="30">Last 30 Days</option>
              <option className="text-gray-800 bg-white" value="60">Last 60 Days</option>
              <option className="text-gray-800 bg-white" value="90">Last 90 Days</option>
            </select>

            <button
              onClick={() => setShowNotifications((p) => !p)}
              className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            >
              {showNotifications ? <BellOff size={18} /> : <Bell size={18} />}
            </button>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className="rounded-lg p-4 flex items-center gap-3 border border-gray-200 bg-white"
            >
              <div className="p-3 rounded-full bg-gray-100">{item.icon}</div>
              <div>
                <h3 className="text-xs font-semibold uppercase text-gray-500">{item.title}</h3>
                <p className="text-lg font-bold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Revenue by Month */}
          <section className="bg-white rounded-lg p-4 border border-gray-200 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Revenue by Month</h2>
            <div className="min-w-[500px]">
              <BarChart width={500} height={260} data={logs.monthly_revenue.map((ms) => ({
                month: new Date(ms.month).toLocaleString("default", { month: "short", year: "numeric" }),
                total_amount: ms.total_amount,
                transaction_count: ms.transaction_count,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} />
                <YAxis tickFormatter={(v) => `$${v.toFixed(0)}`} tick={{ fill: "#6B7280" }} />
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend verticalAlign="bottom" height={30} />
                <Bar dataKey="total_amount" fill={COLORS[0]} name="Revenue" />
                <Bar dataKey="transaction_count" fill={COLORS[1]} name="Transactions" />
              </BarChart>
            </div>
          </section>

          {/* Revenue by Payment Gateway */}
          <section className="bg-white rounded-lg p-4 border border-gray-200 flex flex-col items-center overflow-x-auto">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Revenue by Payment Gateway</h2>
            <div className="min-w-[350px]">
              <PieChart width={350} height={260}>
                <Pie data={logs.pie_chart} dataKey="total" nameKey="payment_gateway_name" cx="50%" cy="50%" outerRadius={80} label={(entry) => entry.payment_gateway_name}>
                  {logs.pie_chart.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend verticalAlign="bottom" height={30} />
              </PieChart>
            </div>
          </section>

          {/* Hourly Transactions */}
          <section className="bg-white rounded-lg p-4 border border-gray-200 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Hourly Transactions (Last 30 days)</h2>
            <div className="min-w-[500px]">
              <LineChart width={500} height={260} data={logs.hourly_transactions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#6B7280" }} />
                <YAxis tick={{ fill: "#6B7280" }} allowDecimals={false} />
                <Tooltip formatter={(value: number) => `${value} tx`} />
                <Line type="monotone" dataKey="count" stroke={COLORS[2]} strokeWidth={2} />
              </LineChart>
            </div>
          </section>

          {/* Payment Gateway Stats */}
          <section className="bg-white rounded-lg p-4 border border-gray-200 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Payment Gateway Stats</h2>
            <div className="min-w-[500px]">
              <BarChart width={500} height={260} data={logs.gateway_stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="payment_gateway_name" tick={{ fontSize: 11, fill: "#6B7280" }} />
                <YAxis tick={{ fill: "#6B7280" }} />
                <Tooltip formatter={(value: number) => (typeof value === "number" ? value.toFixed(2) : value)} />
                <Legend verticalAlign="bottom" height={30} />
                <Bar dataKey="total" fill={COLORS[3]} name="Total Amount" />
                <Bar dataKey="success" fill={COLORS[4]} name="Successful Transactions" />
              </BarChart>
            </div>
          </section>

        </div>
      </div>

      {/* Notifications */}
      <aside
        className={`transition-all duration-300 ease-in-out ${showNotifications ? "max-w-sm opacity-100" : "max-w-0 opacity-0 overflow-hidden"} bg-white border border-gray-200 rounded-xl h-fit max-h-[500px]`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
        </div>
        <div className="p-3 overflow-auto max-h-[440px] space-y-3 mb-4">
          {notifications.map((notif, idx) => (
            <div key={idx} className="flex items-start bg-white border border-gray-200 rounded-lg p-3 gap-3">
              <div className="flex-shrink-0">{ProfileIcon}</div>
              <div>
                <p>
                  <span className="font-semibold">{notif.user}</span>: {notif.message}
                </p>
                <p className="text-xs text-gray-400">Just now</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;

