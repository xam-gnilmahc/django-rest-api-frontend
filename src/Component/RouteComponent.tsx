import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import routesConfig from "../routes/routesConfig";
import { getUserFromToken } from "../utils/authUtils";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 200; // widths

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
      {/* Sidebar with framer-motion */}
      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full bg-gray-800 border-r border-gray-700 shadow-sm z-20"
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.aside>

      {/* Main content wrapper */}
      <motion.div
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col flex-1 bg-gray-900"
      >
        {/* Navbar */}
        <motion.header
          animate={{
            left: sidebarWidth,
            width: `calc(100% - ${sidebarWidth}px)`,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 z-10 bg-gray-800 border-b border-gray-700 flex items-center"
          style={{ height: 64 }}
        >
          <Navbar />
        </motion.header>

        {/* Main body */}
        <main className="mt-16 overflow-auto p-4 h-full">{children}</main>
      </motion.div>
    </div>
  );
};

// **ProtectedRoute component**
const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const user = getUserFromToken();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <ProtectedLayout>
      <Component />
    </ProtectedLayout>
  );
};

const RouteComponent: React.FC = () => {
  const user = getUserFromToken();

  return (
    <Routes>
      {routesConfig.map(({ path, component: Component, protected: isProtected }, idx) => {
        if (path === "/login") {
          return (
            <Route
              key={idx}
              path={path}
              element={user ? <Navigate to="/" replace /> : <Component />}
            />
          );
        }

        if (isProtected) {
          return (
            <Route
              key={idx}
              path={path}
              element={<ProtectedRoute component={Component} />}
            />
          );
        }

        return <Route key={idx} path={path} element={<Component />} />;
      })}

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default RouteComponent;
