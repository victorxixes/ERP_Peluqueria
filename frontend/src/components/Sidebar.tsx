import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const base = "sidebar-link";
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
        <span className="icon">📄</span> Informes PDF/Excel
      </NavLink>

      <NavLink to="/configuracion-fiscal" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">⚙️</span> Configuración fiscal
      </NavLink>

      <NavLink to="/prevision-iva" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📆</span> Previsión IVA
      </NavLink>

      <NavLink to="/iva" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">⚖️</span> IVA Trimestral (303)
      </NavLink>

      <NavLink to="/iva-anual" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📘</span> IVA Anual (390)
      </NavLink>

      <NavLink to="/irpf" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">🧾</span> IRPF Anual
      </NavLink>

      <NavLink to="/ia-fiscal" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">🤖</span> IA Fiscal
      </NavLink>

      <NavLink to="/validacion-excel" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📑</span> Validación Excel
      </NavLink>

      <NavLink to="/importacion-caja" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📥</span> Importación Caja
      </NavLink>

      <NavLink to="/logs" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📝</span> Logs del sistema
      </NavLink>

      <NavLink to="/backup" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">💾</span> Backup
      </NavLink>

      <NavLink to="/validacion-items" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">✔️</span> Validación items
      </NavLink>

      <NavLink to="/modelo-390" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <span className="icon">📙</span> Modelo 390
      </NavLink>
    </aside>
  );
};
