import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* ============================
          📊 ÁREA FISCAL
      ============================ */}
      <h2 className="sidebar-title">Área Fiscal</h2>

      <NavLink to="/" className="sidebar-link">
        <span className="icon">📊</span> Dashboard
      </NavLink>

      <NavLink to="/ingresos" className="sidebar-link">
        <span className="icon">💶</span> Ingresos
      </NavLink>

      <NavLink to="/gastos" className="sidebar-link">
        <span className="icon">📉</span> Gastos
      </NavLink>

      <NavLink to="/iva" className="sidebar-link">
        <span className="icon">💸</span> IVA
      </NavLink>

      <NavLink to="/iva-anual" className="sidebar-link">
        <span className="icon">📅</span> IVA Anual
      </NavLink>

      <NavLink to="/prevision-iva" className="sidebar-link">
        <span className="icon">📈</span> Previsión IVA
      </NavLink>

      <NavLink to="/irpf" className="sidebar-link">
        <span className="icon">🧾</span> IRPF
      </NavLink>

      <NavLink to="/ia-fiscal" className="sidebar-link">
        <span className="icon">🤖</span> IA Fiscal
      </NavLink>

      <NavLink to="/configuracion-fiscal" className="sidebar-link">
        <span className="icon">⚙️</span> Configuración Fiscal
      </NavLink>

      <NavLink to="/modelo390" className="sidebar-link">
        <span className="icon">📘</span> Modelo 390
      </NavLink>


      {/* ============================
          🧾 GESTIÓN
      ============================ */}
      <h2 className="sidebar-title">Gestión</h2>

      <NavLink to="/proveedores" className="sidebar-link">
        <span className="icon">🏪</span> Proveedores
      </NavLink>

      <NavLink to="/activos" className="sidebar-link">
        <span className="icon">📦</span> Activos
      </NavLink>

      <NavLink to="/nominas" className="sidebar-link">
        <span className="icon">🧑‍💼</span> Nóminas
      </NavLink>

      <NavLink to="/usuarios" className="sidebar-link">
        <span className="icon">👥</span> Usuarios
      </NavLink>

      <NavLink to="/informes" className="sidebar-link">
        <span className="icon">📑</span> Informes
      </NavLink>

      <NavLink to="/historico" className="sidebar-link">
        <span className="icon">📚</span> Histórico
      </NavLink>


      {/* ============================
          📥 IMPORTACIÓN / VALIDACIÓN
      ============================ */}
      <h2 className="sidebar-title">Importación / Validación</h2>

      <NavLink to="/validacion-excel" className="sidebar-link">
        <span className="icon">📊</span> Validación Excel
      </NavLink>

      <NavLink to="/validacion-items" className="sidebar-link">
        <span className="icon">🧩</span> Validación Items
      </NavLink>

      <NavLink to="/importacion-caja" className="sidebar-link">
        <span className="icon">📥</span> Importación Caja
      </NavLink>


      {/* ============================
          ⚙️ SISTEMA
      ============================ */}
      <h2 className="sidebar-title">Sistema</h2>

      <NavLink to="/logs" className="sidebar-link">
        <span className="icon">📜</span> Logs
      </NavLink>

      <NavLink to="/backup" className="sidebar-link">
        <span className="icon">💾</span> Backup
      </NavLink>

    </aside>
  );
};
