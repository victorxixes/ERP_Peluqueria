import { useEffect, useState } from "react";
import api from "../utils/api";

export const LogsPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [dark, setDark] = useState(true);

  const cargar = async () => {
    const r = await api.get("/logs");
    setLogs(r.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const filtrar = () => {
    return logs.filter((l) => {
      const coincideTipo = filtroTipo ? l.tipo === filtroTipo : true;
      const coincideUsuario = filtroUsuario ? l.usuario === filtroUsuario : true;
      const coincideBusqueda = busqueda
        ? JSON.stringify(l).toLowerCase().includes(busqueda.toLowerCase())
        : true;

      return coincideTipo && coincideUsuario && coincideBusqueda;
    });
  };

  const tipos = [...new Set(logs.map((l) => l.tipo))];
  const usuarios = [...new Set(logs.map((l) => l.usuario))];

  return (
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Panel de Logs</h1>
          <p className="text-muted">Auditoría completa del ERP</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>

      {/* Filtros */}
      <div className="filters-card animate-fade">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="flex flex-col">
            <label className="input-label">Tipo</label>
            <select
              className="input"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="">Todos</option>
              {tipos.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="input-label">Usuario</label>
            <select
              className="input"
              value={filtroUsuario}
              onChange={(e) => setFiltroUsuario(e.target.value)}
            >
              <option value="">Todos</option>
              {usuarios.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="input-label">Buscar</label>
            <input
              type="text"
              placeholder="Buscar en todos los campos…"
              className="input"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* Tabla */}
      <div className="table-container animate-fade">
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Acción</th>
              <th>Usuario</th>
              <th>Datos</th>
            </tr>
          </thead>

          <tbody>
            {filtrar().map((l) => (
              <tr key={l.id}>
                <td>{new Date(l.fecha).toLocaleString()}</td>

                <td>
                  <span className="tag tag-blue">{l.tipo}</span>
                </td>

                <td>{l.accion}</td>

                <td>{l.usuario}</td>

                <td>
                  <details className="details">
                    <summary className="details-summary">Ver datos</summary>
                    <pre className="details-pre">
                      {JSON.stringify(l.datos, null, 2)}
                    </pre>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
