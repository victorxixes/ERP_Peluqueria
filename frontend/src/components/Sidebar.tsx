import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const base =
    "sidebar-link flex items-center gap-3 px-4 py-2 rounded-lg transition-all";
  const active = "sidebar-active";

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">ERP Fiscal</h2>

      <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📊</span> Dashboard
      </NavLink>

      <NavLink to="/ingresos" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">💶</span> Ingresos
      </NavLink>

      <NavLink to="/gastos" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📉</span> Gastos
      </NavLink>

      <NavLink to="/proveedores" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">🏢</span> Proveedores
      </NavLink>

      <NavLink to="/activos" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📦</span> Activos
      </NavLink>

      <NavLink to="/nominas" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">👥</span> Nóminas
      </NavLink>

      <NavLink to="/usuarios" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">🧑‍💼</span> Usuarios
      </NavLink>

      <NavLink to="/historico" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📚</span> Histórico
      </NavLink>

      <NavLink to="/informes" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📄</span> Informes
      </NavLink>

      <NavLink to="/iva" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">⚖️</span> IVA
      </NavLink>

      <NavLink to="/logs" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📝</span> Logs
      </NavLink>

      <NavLink to="/backup" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">💾</span> Backup
      </NavLink>
    </aside>
  );
};
