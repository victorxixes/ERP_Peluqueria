import { useState } from "react";
import { getIVAPrevision } from "../api/ivaApi";

export const PrevisionIVAPage = () => {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);

  const cargarPrevision = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await getIVAPrevision(desde, hasta);
      setData(result);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Previsión IVA</h1>
          <p className="text-muted">Estimación inteligente del IVA según rango de fechas</p>
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
        <h2 className="section-title mb-4">Seleccionar periodo</h2>

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
          onClick={cargarPrevision}
          className="btn primary mt-6"
          disabled={loading}
        >
          {loading ? "Calculando…" : "Cargar previsión"}
        </button>
      </div>

      {/* Resultado */}
      {data && (
        <div className="result-card animate-fade">

          <h2 className="section-title mb-4">Resultado de la previsión</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="iva-box green">
              <h3 className="iva-title">Base imponible</h3>
              <p className="iva-value">{data.base_imponible} €</p>
            </div>

            <div className="iva-box blue">
              <h3 className="iva-title">IVA estimado</h3>
              <p className="iva-value">{data.iva_estimado} €</p>
            </div>

            <div className="iva-box purple">
              <h3 className="iva-title">Operaciones</h3>
              <p className="iva-value">{data.operaciones}</p>
            </div>

          </div>

          {/* JSON opcional */}
          <details className="json-details mt-6">
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
