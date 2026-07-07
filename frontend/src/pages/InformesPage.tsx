import { useEffect, useState } from "react";
import api from "../utils/api";

export const InformesPage = () => {
  const [informes, setInformes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dark, setDark] = useState(true);

  const cargar = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const r = await api.get("/informes");
      setInformes(r.data);
    } catch (err) {
      console.error(err);
      setError("Error cargando los informes");
    }

    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  // -----------------------------
  // BOTONES DE CIERRE FISCAL
  // -----------------------------
  const generar = async (endpoint: string, body: any, mensajeError: string) => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      await api.post(endpoint, body);
      cargar();
    } catch (err) {
      console.error(err);
      setError(mensajeError);
    }

    setLoading(false);
  };

  return (
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Informes</h1>
          <p className="text-muted">Generación y descarga de informes fiscales</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>

      {/* Estado */}
      {loading && (
        <div className="status-card animate-fade">
          <p>Cargando informes…</p>
        </div>
      )}

      {error && (
        <div className="status-error animate-fade">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* BOTONES DE CIERRE FISCAL */}
      <div className="fiscal-buttons animate-fade">
        <button
          className="btn fiscal green"
          onClick={() =>
            generar("/informes/generar-cierre-mensual", { year: 2026, month: 6 }, "Error generando cierre mensual")
          }
        >
          Cierre mensual
        </button>

        <button
          className="btn fiscal blue"
          onClick={() =>
            generar("/informes/generar-cierre-trimestral", { year: 2026, quarter: 2 }, "Error generando cierre trimestral")
          }
        >
          Cierre trimestral
        </button>

        <button
          className="btn fiscal purple"
          onClick={() =>
            generar("/informes/generar-cierre-anual", { year: 2026 }, "Error generando cierre anual")
          }
        >
          Cierre anual
        </button>

        <button
          className="btn fiscal orange"
          onClick={() =>
            generar("/informes/generar-modelo-390", { year: 2026 }, "Error generando Modelo 390")
          }
        >
          Modelo 390
        </button>

        <button
          className="btn fiscal gray"
          onClick={() =>
            generar("/informes/generar-prevision-iva", { year: 2026, month: 6 }, "Error generando previsión IVA")
          }
        >
          Previsión IVA
        </button>
      </div>

      {/* TABLA DE INFORMES */}
      <div className="table-container animate-fade">
        <h2 className="section-title mb-4">Informes generados</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {informes.map((i) => (
              <tr key={i.id}>
                <td>{i.nombre}</td>
                <td>{i.fecha}</td>
                <td>
                  <a
                    href={`${api.defaults.baseURL}/informes/${i.id}`}
                    className="btn small primary"
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
