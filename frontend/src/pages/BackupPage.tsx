import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/api";

export const BackupPage = () => {
  const [backups, setBackups] = useState<any[]>([]);
  const [estado, setEstado] = useState<string>("");
  const [dark, setDark] = useState(true);

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
      setEstado("Generando backup…");

      const res = await axios.post("/backup/run", {}, {
        responseType: "blob"
      });

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
    setEstado("Restaurando backup…");
    const r = await api.post(`/backup/restore/${id}`);
    setEstado(r.data.mensaje || "Restauración completada");
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Backup automático</h1>
          <p className="text-muted">Gestión de copias de seguridad del ERP</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>

      {/* Estado */}
      {estado && (
        <div className="status-card animate-fade">
          <p>{estado}</p>
        </div>
      )}

      {/* Botón principal */}
      <button
        onClick={generarBackup}
        className="btn primary mb-6"
      >
        + Generar backup ahora
      </button>

      {/* Tabla premium */}
      <div className="table-container animate-fade">
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tamaño</th>
              <th>Archivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {backups.map((b) => (
              <tr key={b.id}>
                <td>{b.fecha}</td>
                <td>{b.tamano} MB</td>
                <td>{b.nombre}</td>
                <td className="flex gap-3">
                  <button
                    onClick={() => restaurarBackup(b.id)}
                    className="btn small primary"
                  >
                    Restaurar
                  </button>

                  <a
                    href={`http://localhost:8000/backup/download/${b.id}`}
                    className="btn small secondary"
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
