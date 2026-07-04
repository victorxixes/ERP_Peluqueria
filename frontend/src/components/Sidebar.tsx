import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Building2,
  Boxes,
  Users,
  History,
  FileText,
  Settings,
  Calculator,
  BarChart3,
  Percent,
  Brain,
  FileSpreadsheet,
  Upload,
  ListChecks,
  HardDrive,
} from "lucide-react";

export const Sidebar = () => {
  const linkBase =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all";

  const linkActive =
    "bg-slate-200 text-slate-900 font-semibold border-l-4 border-blue-600";

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen p-4 space-y-2 shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-slate-700">ERP Fiscal</h2>

      {/* --- Dashboard --- */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : ""}`
        }
      >
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>

      {/* --- Módulos base --- */}
      <NavLink to="/ingresos" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Wallet size={18} />
        Ingresos
      </NavLink>

      <NavLink to="/gastos" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Receipt size={18} />
        Gastos
      </NavLink>

      <NavLink to="/proveedores" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Building2 size={18} />
        Proveedores
      </NavLink>

      <NavLink to="/activos" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Boxes size={18} />
        Activos
      </NavLink>

      <NavLink to="/nominas" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Users size={18} />
        Nóminas
      </NavLink>

      <NavLink to="/usuarios" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Users size={18} />
        Usuarios
      </NavLink>

      {/* --- Histórico --- */}
      <NavLink to="/historico" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <History size={18} />
        Histórico contable
      </NavLink>

      {/* --- Informes --- */}
      <NavLink to="/informes" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <FileText size={18} />
        Informes PDF/Excel
      </NavLink>

      {/* --- Fiscalidad --- */}
      <NavLink to="/configuracion-fiscal" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Settings size={18} />
        Configuración fiscal
      </NavLink>

      <NavLink to="/prevision-iva" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <BarChart3 size={18} />
        Previsión IVA
      </NavLink>

      <NavLink to="/iva" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Calculator size={18} />
        IVA Trimestral (303)
      </NavLink>

      <NavLink to="/iva-anual" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Percent size={18} />
        IVA Anual (390)
      </NavLink>

      <NavLink to="/irpf" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Percent size={18} />
        IRPF Anual
      </NavLink>

      {/* --- IA Fiscal --- */}
      <NavLink to="/ia-fiscal" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Brain size={18} />
        IA Fiscal
      </NavLink>

      {/* --- Importación / Validación --- */}
      <NavLink to="/validacion-excel" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <FileSpreadsheet size={18} />
        Validación Excel
      </NavLink>

      <NavLink to="/importacion-caja" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <Upload size={18} />
        Importación Caja
      </NavLink>

      {/* --- Logs --- */}
      <NavLink to="/logs" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <ListChecks size={18} />
        Logs del sistema
      </NavLink>

      {/* --- Backup --- */}
      <NavLink to="/backup" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <HardDrive size={18} />
        Backup
      </NavLink>

      {/* --- Validación de ítems --- */}
      <NavLink to="/validacion-items" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
        <ListChecks size={18} />
        Validación de ítems
      </NavLink>
    </aside>
  );
};
