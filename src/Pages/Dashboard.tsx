import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../redux";
import { fetchPaymentLogs } from "../redux/slice/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import loadingAnime from "../Lottie/loading.json";
import Lottie from "lottie-react";
import { Bell, BellOff, Search, ChevronDown, Calendar, MoreHorizontal, Download, Filter } from "lucide-react";
import { getUserFromToken } from "../utils/authUtils";

// Icons
const WalletIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 13h6" /></svg>);
const TransactionIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4-4-4-4m8 8l-4-4 4-4" /></svg>);
const RefundIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const ProfileIcon = (<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a6.5 6.5 0 0113 0" /></svg>);

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { logs, loading, error } = useSelector((state: RootState) => state.paymentLogs);
  const [dateFilter, setDateFilter] = useState("last7days");
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

  useEffect(() => { dispatch(fetchPaymentLogs()); }, [dispatch]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center pt-16 h-full bg-gray-50">
      <Lottie animationData={loadingAnime} loop className="w-20 h-20" />
      <p className="mt-4 text-gray-700 font-semibold text-lg">Loading dashboard data...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <p className="text-red-600 font-semibold">Error: {error}</p>
    </div>
  );

  if (!logs) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <p className="text-gray-500">No data found.</p>
    </div>
  );

  // Color palette for charts and stats
  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f43f5e", "#22d3ee"];
  const STATS_BG = ["#eef2ff","#d1fae5","#fef3c7","#fee2e2","#ede9fe","#cffafe"];
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  const stats = [
    { title: "Total Earned", value: formatCurrency(logs.stats.total_earned), icon: <WalletIcon />, trend: "+12.3%", positive: true, bg: STATS_BG[0] },
    { title: "Total Transactions", value: logs.stats.total_transactions, icon: <TransactionIcon />, trend: "+8.2%", positive: true, bg: STATS_BG[1] },
    { title: "Avg Transaction", value: formatCurrency(logs.stats.average_transaction), icon: <WalletIcon />, trend: "+2.1%", positive: true, bg: STATS_BG[2] },
    { title: "Total Refunded", value: formatCurrency(logs.stats.total_refunded), icon: <RefundIcon />, trend: "-3.4%", positive: false, bg: STATS_BG[3] },
    { title: "Failed Transactions", value: logs.stats.failed_transactions, icon: <TransactionIcon />, trend: "+1.2%", positive: false, bg: STATS_BG[4] },
    { title: "Success Ratio", value: `${(logs.stats.success_ratio * 100).toFixed(2)}%`, icon: <WalletIcon />, trend: "+4.5%", positive: true, bg: STATS_BG[5] },
  ];

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}, {user?.username || "Admin"} 👋</h1>
          <p className="text-gray-500">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={() => setShowNotifications(p => !p)}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition relative"
          >
            {showNotifications ? <BellOff size={20} /> : <Bell size={20} />}
            <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-200 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
              {user?.username?.charAt(0).toUpperCase() || "A"}
            </div>
            <span className="text-gray-700 font-medium hidden sm:block">{user?.username || "Admin"}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg`} style={{ backgroundColor: item.bg }}>
                {item.icon}
              </div>
              <span className={`text-xs font-medium ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                {item.trend}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mt-4">{item.title}</h3>
            <p className="text-xl font-bold text-gray-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* CHARTS & DATA SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart - 2/3 width */}
        <div className="xl:col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-50">
                <Filter size={16} />
                Filter
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-50">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={logs.monthly_revenue.map(ms => ({
                month: new Date(ms.month).toLocaleString("default", { month: "short", year: "numeric" }),
                total_amount: ms.total_amount,
                transaction_count: ms.transaction_count,
              }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `$${v.toFixed(0)}`} tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={value => [`$${(value as number).toFixed(2)}`, "Revenue"]} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="total_amount" fill={COLORS[0]} radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="transaction_count" fill={COLORS[1]} radius={[4, 4, 0, 0]} name="Transactions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods - 1/3 width */}
        <div className="xl:col-span-1 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={logs.pie_chart}
                  dataKey="total"
                  nameKey="payment_gateway_name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  label={(entry) => `${entry.payment_gateway_name}: $${entry.total.toFixed(2)}`}
                >
                  {logs.pie_chart.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={value => `$${(value as number).toFixed(2)}`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ paddingLeft: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
