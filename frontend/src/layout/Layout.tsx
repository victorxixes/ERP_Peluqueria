import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "./layout.css"; // 🔥 Importamos el CSS que SIEMPRE funciona

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









