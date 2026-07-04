export const Topbar = () => {
  return (
    <div className="topbar">
      
      {/* IZQUIERDA */}
      <div className="topbar-left">
        <h1 className="topbar-title">ERP Fiscal</h1>
        <span className="breadcrumb">/ Dashboard</span>
      </div>

      {/* CENTRO */}
      <input
        type="text"
        className="topbar-search"
        placeholder="Buscar…"
      />

      {/* DERECHA */}
      <div className="topbar-right">
        <span className="topbar-icon">🔔</span>
        <span className="topbar-icon">⚙️</span>

        {/* Avatar con inicial */}
        <div className="topbar-avatar">V</div>
      </div>

    </div>
  );
};
