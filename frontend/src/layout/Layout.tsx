import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import import "../styles/Layout.css";

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









