import { Sidebar } from "../styles/Sidebar.css";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";

export const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};










