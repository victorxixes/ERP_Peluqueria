export const TopbarBlocks = () => {
  const items = [
    { icon: "📊", title: "Dashboard" },
    { icon: "💶", title: "Ingresos" },
    { icon: "📉", title: "Gastos" },
    { icon: "🏢", title: "Proveedores" },
    { icon: "📦", title: "Activos" },
    { icon: "👥", title: "Nóminas" },
    { icon: "🧑‍💼", title: "Usuarios" },
    { icon: "📚", title: "Histórico" },
    { icon: "📄", title: "Informes" },
    { icon: "⚖️", title: "IVA" },
    { icon: "📝", title: "Logs" },
    { icon: "💾", title: "Backup" },
  ];

  return (
    <div className="topbar-blocks">
      {items.map((item, i) => (
        <div key={i} className="topbar-item">
          <span className="topbar-item-icon">{item.icon}</span>
          <span className="topbar-item-title">{item.title}</span>
        </div>
      ))}
    </div>
  );
};
