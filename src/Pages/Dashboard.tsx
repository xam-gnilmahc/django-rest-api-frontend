import React, { useEffect, useState, useRef } from "react";
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
import { getUserFromToken } from "../utils/authUtils";

// Icons
const WalletIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 13h6" />
  </svg>
);
const TransactionIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4-4-4-4m8 8l-4-4 4-4" />
  </svg>
);
const RefundIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ProfileIcon = (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0113 0" />
  </svg>
);

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { logs, loading, error } = useSelector((state: RootState) => state.paymentLogs);
  const [dateFilter, setDateFilter] = useState("30");
  const [showNotifications, setShowNotifications] = useState(false);
  const user = getUserFromToken();
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  useEffect(() => {
    dispatch(fetchPaymentLogs());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center pt-16 h-full bg-gray-900">
        <Lottie animationData={loadingAnime} loop className="w-20 h-20" />
        <p className="mt-4 text-white font-semibold text-lg">Loading dashboard data...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  if (!logs)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-gray-300">No data found.</p>
      </div>
    );

  const COLORS = ["#22c55e", "#3b82f6", "#a78bfa", "#f87171", "#facc15", "#14b8a6"];
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  const stats = [
    { title: "Total Earned", value: formatCurrency(logs.stats.total_earned), icon: <WalletIcon /> },
    { title: "Total Transactions", value: logs.stats.total_transactions, icon: <TransactionIcon /> },
    { title: "Avg Transaction", value: formatCurrency(logs.stats.average_transaction), icon: <WalletIcon /> },
    { title: "Total Refunded", value: formatCurrency(logs.stats.total_refunded), icon: <RefundIcon /> },
    { title: "Failed Transactions", value: logs.stats.failed_transactions, icon: <TransactionIcon /> },
    { title: "Success Ratio", value: `${(logs.stats.success_ratio * 100).toFixed(2)}%`, icon: <WalletIcon /> },
  ];

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6 min-h-screen overflow-auto p-4 bg-gray-900 text-white">

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col gap-6">

        {/* HEADER */}
        <header className="flex flex-wrap items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700">
          <h1 className="text-2xl font-extrabold text-white">{getGreeting()}, {user?.name || "Welcome Back"} 👋</h1>
          <div className="flex gap-3 items-center">
            <select
              className="rounded-md px-3 py-1 text-sm font-semibold bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="30">Last 30 Days</option>
              <option value="60">Last 60 Days</option>
              <option value="90">Last 90 Days</option>
            </select>

            <button
              onClick={() => setShowNotifications((p) => !p)}
              className="p-2 border border-gray-600 rounded-md text-white hover:bg-gray-700 transition"
            >
              {showNotifications ? <BellOff size={18} /> : <Bell size={18} />}
            </button>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className="rounded-lg p-4 flex flex-col items-center gap-2 border shadow-sm"
              style={{ backgroundColor: `rgba(${50 + i * 30}, ${150 + i * 20}, 240, 0.2)` }}
            >
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: `rgba(${50 + i * 30}, ${150 + i * 20}, 240, 0.4)` }}
              >
                {item.icon}
              </div>
              <h3 className="text-xs font-semibold text-white">{item.title}</h3>
              <p className="text-base font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* CHARTS GRID */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-min grid-flow-row-dense">

          {/* Revenue by Month */}
          <section className="rounded-lg p-4 border shadow-sm" style={{ backgroundColor: "#1e3a8a", borderColor: "#3b82f6" }}>
            <h2 className="text-lg font-semibold mb-3 text-white">Revenue by Month</h2>
            <div className="min-w-[500px]">
              <BarChart width={500} height={260} data={logs.monthly_revenue.map((ms) => ({
                month: new Date(ms.month).toLocaleString("default", { month: "short", year: "numeric" }),
                total_amount: ms.total_amount,
                transaction_count: ms.transaction_count,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#93c5fd" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#fff" }} />
                <YAxis tickFormatter={(v) => `$${v.toFixed(0)}`} tick={{ fill: "#fff" }} />
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend verticalAlign="bottom" height={30} />
                <Bar dataKey="total_amount" fill={COLORS[0]} name="Revenue" />
                <Bar dataKey="transaction_count" fill={COLORS[1]} name="Transactions" />
              </BarChart>
            </div>
          </section>

          {/* Revenue by Payment Gateway */}
          <section className="rounded-lg p-4 flex flex-col items-center shadow-sm" style={{ backgroundColor: "#78350f", borderColor: "#facc15" }}>
            <h2 className="text-lg font-semibold mb-3 text-white">Revenue by Payment Gateway</h2>
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
          <section className="rounded-lg p-4 border shadow-sm" style={{ backgroundColor: "#5b21b6", borderColor: "#a78bfa" }}>
            <h2 className="text-lg font-semibold mb-3 text-white">Hourly Transactions (Last 30 days)</h2>
            <div className="min-w-[500px]">
              <LineChart width={500} height={260} data={logs.hourly_transactions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#c4b5fd" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#fff" }} />
                <YAxis tick={{ fill: "#fff" }} allowDecimals={false} />
                <Tooltip formatter={(value: number) => `${value} tx`} />
                <Line type="monotone" dataKey="count" stroke={COLORS[2]} strokeWidth={2} />
              </LineChart>
            </div>
          </section>

          {/* Payment Gateway Stats */}
          <section className="rounded-lg p-4 border shadow-sm" style={{ backgroundColor: "#b91c1c", borderColor: "#f87171" }}>
            <h2 className="text-lg font-semibold mb-3 text-white">Payment Gateway Stats</h2>
            <div className="min-w-[500px]">
              <BarChart width={500} height={260} data={logs.gateway_stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                <XAxis dataKey="payment_gateway_name" tick={{ fontSize: 11, fill: "#fff" }} />
                <YAxis tick={{ fill: "#fff" }} />
                <Tooltip formatter={(value: number) => (typeof value === "number" ? value.toFixed(2) : value)} />
                <Legend verticalAlign="bottom" height={30} />
                <Bar dataKey="total" fill={COLORS[3]} name="Total Amount" />
                <Bar dataKey="success" fill={COLORS[4]} name="Successful Transactions" />
              </BarChart>
            </div>
          </section>

        </div>
      </div>

      {/* Notifications Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-gray-800 border-l border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out z-50 
        ${showNotifications ? "translate-x-0" : "translate-x-full"}`}
      >
        <div ref={notifRef} className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-900">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
          <button
            onClick={() => setShowNotifications(false)}
            className="text-white hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-60px)] space-y-3">
          {[...Array(12)].map((_, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-700 transition">
              {ProfileIcon}
              <div>
                <p><span className="font-semibold text-white">User {idx+1}</span>: Sample notification message.</p>
                <p className="text-xs text-gray-300">Just now</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
