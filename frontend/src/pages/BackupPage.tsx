import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../utils/api";

export const BackupPage = () => {
  const [backups, setBackups] = useState<any[]>([]);
  const [estado, setEstado] = useState<string>("");

  const cargar = async () => {
    try {
      const r = await api.get("/backup/list");
      setBackups(r.data);
    } catch {
      setBackups([]);
    }
  };

  const generarBackup = async () => {
    try {
      setEstado("Generando backup...");

      const res = await axios.post("/backup/run", {}, {
        responseType: "blob"
      });

      // Descargar ZIP
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "backup.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setEstado("Backup completado");
      cargar();
    } catch (error) {
      console.error("Error generando backup:", error);
      setEstado("Error generando backup");
    }
  };

  const restaurarBackup = async (id: string) => {
    setEstado("Restaurando backup...");
    const r = await api.post(`/backup/restore/${id}`);
    setEstado(r.data.mensaje || "Restauración completada");
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="p-10 bg-white text-black min-h-screen space-y-10">

      {/* Título */}
      <div>
        <h1 className="text-4xl font-bold">Backup automático</h1>
        <p className="text-gray-600 mt-1">Gestión de copias de seguridad del ERP</p>
      </div>

      {/* Estado */}
      {estado && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <p className="text-blue-700 font-semibold">{estado}</p>
        </div>
      )}

      {/* Botón principal */}
      <button
        onClick={generarBackup}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Generar backup ahora
      </button>

      {/* Tabla de backups */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600">
              <th className="py-2">Fecha</th>
              <th>Tamaño</th>
              <th>Archivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {backups.map((b) => (
              <tr key={b.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2">{b.fecha}</td>
                <td>{b.tamano} MB</td>
                <td>{b.nombre}</td>
                <td className="flex gap-3">
                  <button
                    onClick={() => restaurarBackup(b.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Restaurar
                  </button>

                  <a
                    href={`http://localhost:8000/backup/download/${b.id}`}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Descargar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
