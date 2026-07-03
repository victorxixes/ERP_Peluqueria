import { useEffect, useState } from "react";
import  api  from "../utils/api";

export const LogsPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [busqueda, setBusqueda] = useState("");

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
    <div className="p-10 bg-white min-h-screen text-black space-y-10">

      <h1 className="text-4xl font-bold">Panel de Logs</h1>
      <p className="text-gray-600">Auditoría completa del ERP</p>

      {/* Filtros */}
      <div className="flex gap-5 bg-gray-100 p-5 rounded-xl shadow-sm">

        <select
          className="px-3 py-2 rounded-lg border"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Tipo (todos)</option>
          {tipos.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          className="px-3 py-2 rounded-lg border"
          value={filtroUsuario}
          onChange={(e) => setFiltroUsuario(e.target.value)}
        >
          <option value="">Usuario (todos)</option>
          {usuarios.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar..."
          className="px-3 py-2 rounded-lg border flex-1"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600">
              <th className="py-2">Fecha</th>
              <th>Tipo</th>
              <th>Acción</th>
              <th>Usuario</th>
              <th>Datos</th>
            </tr>
          </thead>

          <tbody>
            {filtrar().map((l) => (
              <tr key={l.id} className="border-b border-gray-200 hover:bg-gray-50">

                <td className="py-2">
                  {new Date(l.fecha).toLocaleString()}
                </td>

                <td>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                    {l.tipo}
                  </span>
                </td>

                <td>{l.accion}</td>

                <td>{l.usuario}</td>

                <td>
                  <details className="cursor-pointer">
                    <summary className="text-blue-600">Ver datos</summary>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm mt-2">
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
