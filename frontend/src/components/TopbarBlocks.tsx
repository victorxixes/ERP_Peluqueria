import { NavLink } from "react-router-dom";

export const TopbarBlocks = () => {
  const items = [
    { icon: "📊", title: "Dashboard", to: "/" },
    { icon: "💶", title: "Ingresos", to: "/ingresos" },
    { icon: "📉", title: "Gastos", to: "/gastos" },
    { icon: "🏢", title: "Proveedores", to: "/proveedores" },
    { icon: "📦", title: "Activos", to: "/activos" },
    { icon: "👥", title: "Nóminas", to: "/nominas" },
    { icon: "🧑‍💼", title: "Usuarios", to: "/usuarios" },
    { icon: "📚", title: "Histórico", to: "/historico" },
    { icon: "📄", title: "Informes", to: "/informes" },
    { icon: "⚙️", title: "Configuración fiscal", to: "/configuracion-fiscal" },
    { icon: "📆", title: "Previsión IVA", to: "/prevision-iva" },
    { icon: "⚖️", title: "IVA Trimestral", to: "/iva" },
    { icon: "📘", title: "IVA Anual", to: "/iva-anual" },
    { icon: "🧾", title: "IRPF Anual", to: "/irpf" },
    { icon: "🤖", title: "IA Fiscal", to: "/ia-fiscal" },
    { icon: "📑", title: "Validación Excel", to: "/validacion-excel" },
    { icon: "📥", title: "Importación Caja", to: "/importacion-caja" },
    { icon: "📝", title: "Logs del sistema", to: "/logs" },
    { icon: "💾", title: "Backup", to: "/backup" },
    { icon: "✔️", title: "Validación items", to: "/validacion-items" },
    { icon: "📙", title: "Modelo 390", to: "/modelo-390" },
  ];

  return (
    <div className="topbar-blocks">
      {items.map((item, i) => (
        <NavLink key={i} to={item.to} className="topbar-item">
          <span className="topbar-item-icon">{item.icon}</span>
          <span className="topbar-item-title">{item.title}</span>
        </NavLink>
      ))}
    </div>
  );
};
