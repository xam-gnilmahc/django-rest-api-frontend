import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const HomeIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M3 12l2-2m0 0l7-7 7 7m-9 12v-7h4v7m5-12l2 2" />
  </svg>
);

const ProfileIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0113 0" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1.51-1 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const PaymentIcon = () => (
  <svg
    className="w-6 h-6 text-emerald-600"
    fill="none"
    stroke="black"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M12 8c-1.657 0-3 1.343-3 3 0 1.307.835 2.417 2 2.83V16h2v-2.17c1.165-.413 2-1.523 2-2.83 0-1.657-1.343-3-3-3z" />
    <path d="M6 12v-2a6 6 0 1112 0v2" />
    <path d="M4 20h16v-4H4v4z" />
  </svg>
);

const menuItems = [
  { name: "Home", to: "/", icon: <HomeIcon /> },
  { name: "Profile", to: "/profile", icon: <ProfileIcon /> },
  { name: "Settings", to: "/setting", icon: <SettingsIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const sidebarWidth = collapsed ? 64 : 200; // updated widths

  return (
    <div
      className={`flex flex-col h-full transition-all duration-300 ease-in-out`}
      style={{ width: sidebarWidth }}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 relative">
        <div className="flex items-center gap-2 select-none">
          <PaymentIcon />
          {!collapsed && (
            <span className="text-black font-bold text-xl">Payinme</span>
          )}
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-[-14px] top-1/2 transform -translate-y-1/2
            bg-white hover:bg-gray-100 border border-gray-300 rounded-full
            shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400
            flex items-center justify-center"
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          style={{ width: 28, height: 28, padding: 0 }}
        >
          <svg
            className={`w-5 h-5 text-emerald-500 transform transition-transform duration-300 ${
              collapsed ? "rotate-180" : "rotate-0"
            }`}
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
                  isActive
                    ? "bg-emerald-100 text-emerald-700 font-semibold"
                    : "text-black"
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
            className={`flex items-center justify-center gap-2 border border-gray-300 text-black bg-white px-2 py-2 rounded-md transition-colors hover:bg-gray-100
    ${collapsed ? "w-10" : "w-full"}`}
          >
            {/* Always visible icon */}
            <svg
              className="h-5 w-5 text-red-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"
              />
            </svg>

            {/* Text hidden when collapsed */}
            {!collapsed && <span>Logout</span>}
          </button>

          {/* Logout Modal */}
          <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-red-100">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"
                        />
                      </svg>
                    </div>
                    <DialogTitle className="text-lg font-medium leading-6 text-black">
                      Confirm Logout
                    </DialogTitle>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-black">
                      Are you sure you want to log out? You will be redirected
                      to the login page.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 border"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
