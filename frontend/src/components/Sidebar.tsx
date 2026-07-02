import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const linkBase =
    "block px-4 py-2 rounded hover:bg-slate-800 transition-colors";

  const linkActive =
    "bg-slate-800 text-white font-semibold";

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 h-screen p-4 space-y-2">
      <h2 className="text-xl font-bold mb-4">ERP Fiscal</h2>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : ""}`
        }
      >
        Dashboard
      </NavLink>

      {/* --- Módulos base --- */}
      <NavLink to="/ingresos" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Ingresos
      </NavLink>

      <NavLink to="/gastos" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Gastos
      </NavLink>

      <NavLink to="/proveedores" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Proveedores
      </NavLink>

      <NavLink to="/activos" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Activos
      </NavLink>

      <NavLink to="/nominas" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Nóminas
      </NavLink>

      <NavLink to="/usuarios" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Usuarios
      </NavLink>

      {/* --- Histórico --- */}
      <NavLink to="/historico" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Histórico contable
      </NavLink>

      {/* --- Informes --- */}
      <NavLink to="/informes" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Informes PDF/Excel
      </NavLink>

      {/* --- Fiscalidad --- */}
      <NavLink to="/configuracion-fiscal" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Configuración fiscal
      </NavLink>

      <NavLink to="/prevision-iva" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Previsión IVA
      </NavLink>

      <NavLink to="/iva" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        IVA Trimestral (303)
      </NavLink>

      <NavLink to="/iva-anual" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        IVA Anual (390)
      </NavLink>

      <NavLink to="/irpf" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        IRPF Anual
      </NavLink>

      {/* --- IA Fiscal --- */}
      <NavLink to="/ia-fiscal" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        IA Fiscal
      </NavLink>

      {/* --- Importación / Validación --- */}
      <NavLink to="/validacion-excel" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Validación Excel
      </NavLink>

      <NavLink to="/importacion-caja" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Importación Caja
      </NavLink>

      {/* --- Logs --- */}
      <NavLink to="/logs" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Logs del sistema
      </NavLink>

      {/* --- Backup --- */}
      <NavLink to="/backup" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Backup
      </NavLink>

      {/* --- Validación de ítems --- */}
      <NavLink to="/validacion-items" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        Validación de ítems
      </NavLink>
    </aside>
  );
};
