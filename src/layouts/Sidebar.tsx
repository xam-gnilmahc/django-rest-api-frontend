import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import payment from "../Lottie/payment.json";
import Lottie from "lottie-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

/* === ICONS === */
const HomeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9.5L12 3l9 6.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ProfileIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0113 0" />
  </svg>
);

const SettingsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1.82v.08a2 2 0 0 1-4 0v-.08a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.82-.33h-.08a2 2 0 0 1 0-4h.08a1.65 1.65 0 0 0 1.82-.33 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .33-1.82V2.1a2 2 0 0 1 4 0v.08a1.65 1.65 0 0 0 .33 1.82 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.26.39.39.86.39 1.34s-.13.95-.39 1.34z" />
  </svg>
);


const PaymentIcon: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className={`flex-shrink-0 ${collapsed ? "w-8 h-8" : "w-32 h-32"}`}>
    <Lottie animationData={payment} loop />
  </div>
);

const LogoutIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-red-600" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
/* === END ICONS === */

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };

  const sidebarWidth = collapsed ? 64 : 200;

  const menuItems = [
    { name: "Home", to: "/", icon: <HomeIcon /> },
    { name: "Profile", to: "/profile", icon: <ProfileIcon /> },
    { name: "Settings", to: "/setting", icon: <SettingsIcon /> },
  ];

  return (
    <div className="flex flex-col h-full transition-all duration-300 ease-in-out" style={{ width: sidebarWidth }}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 relative">
        <div className="flex items-center gap-1 select-none">
          <PaymentIcon collapsed={collapsed} />
          {/* {!collapsed && <span className="text-black font-bold text-xl">Payinme</span>} */}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-[-14px] top-1/2 transform -translate-y-1/2
            bg-white hover:bg-gray-100 border border-gray-300 rounded-full
            shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400
            flex items-center justify-center"
          style={{ width: 28, height: 28 }}
        >
          <svg
            className={`w-5 h-5 text-emerald-500 transform transition-transform duration-300 ${collapsed ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col justify-between flex-grow overflow-auto pt-2">
        <div>
          {menuItems.map(({ name, to, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 hover:bg-emerald-100 transition-colors ${
                  isActive ? "bg-emerald-100 text-emerald-700 font-semibold" : "text-black"
                }`
              }
              end
            >
              <div className="flex-shrink-0 text-emerald-600">{icon}</div>
              {!collapsed && <span>{name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={() => setOpen(true)}
            className={`flex items-center justify-center gap-2 border border-gray-300 text-black bg-white px-2 py-2 rounded-md transition-colors hover:bg-gray-100 ${collapsed ? "w-10" : "w-full"}`}
          >
            <LogoutIcon />
            {!collapsed && <span>Logout</span>}
          </button>

          <Dialog open={open} onClose={setOpen} className="fixed inset-0 z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center p-4">
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-red-100"><LogoutIcon /></div>
                  <DialogTitle className="text-lg font-medium leading-6 text-black">Confirm Logout</DialogTitle>
                </div>
                <p className="mt-2 text-sm text-black">Are you sure you want to log out?</p>
                <div className="mt-4 flex justify-end gap-3">
                  <button onClick={() => setOpen(false)} className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 border">Cancel</button>
                  <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
