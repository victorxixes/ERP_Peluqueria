import { useState } from "react";
import { getIVAResumen } from "../api/ivaApi";

export const IVAPage = () => {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [data, setData] = useState<any>(null);
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);

  const cargarResumen = async () => {
    setLoading(true);
    const result = await getIVAResumen(desde, hasta);
    setData(result);
    setLoading(false);
  };

  return (
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Resumen IVA</h1>
          <p className="text-muted">Consulta del IVA repercutido y soportado</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>

      {/* Formulario */}
      <div className="form-card animate-fade">
        <h2 className="section-title mb-4">Rango de fechas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="input-label">Desde</label>
            <input
              type="date"
              className="input"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="input-label">Hasta</label>
            <input
              type="date"
              className="input"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={cargarResumen}
          className="btn primary mt-6"
          disabled={loading}
        >
          {loading ? "Cargando…" : "Cargar resumen"}
        </button>
      </div>

      {/* Resultado */}
      {data && (
        <div className="result-card animate-fade">

          <h2 className="section-title mb-4">Resultado del IVA</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="iva-box">
              <h3 className="iva-title">IVA repercutido</h3>
              <p className="iva-value text-green">{data.iva_repercutido} €</p>
            </div>

            <div className="iva-box">
              <h3 className="iva-title">IVA soportado</h3>
              <p className="iva-value text-yellow">{data.iva_soportado} €</p>
            </div>

            <div className="iva-box">
              <h3 className="iva-title">IVA final</h3>
              <p className="iva-value text-blue">{data.iva_final} €</p>
            </div>

          </div>

          {/* JSON opcional */}
          <details className="json-details">
            <summary className="json-summary">Ver JSON completo</summary>
            <pre className="json-pre">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};
