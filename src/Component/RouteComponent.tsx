import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routesConfig from "../routes/routesConfig";
import { getUserFromToken } from "../utils/authUtils";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 200; // reduced widths

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className="fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out"
        style={{ width: sidebarWidth }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      <div
        className="flex flex-col flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        <header
          className="fixed top-0 right-0 z-10 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out"
          style={{
            left: sidebarWidth,
            height: 64,
            width: `calc(100% - ${sidebarWidth}px)`,
          }}
        >
          <Navbar />
        </header>

        <main
          className="mt-16 overflow-auto p-4 h-full"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

// **ProtectedRoute component**
const ProtectedRoute: React.FC<{ component: React.FC }> = ({
  component: Component,
}) => {
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
      {routesConfig.map(
        ({ path, component: Component, protected: isProtected }, idx) => {
          if (path === "/login") {
            // If user is already logged in, redirect to dashboard
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
        }
      )}

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default RouteComponent;
