import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

