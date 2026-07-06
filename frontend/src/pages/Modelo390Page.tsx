import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Modelo390Page() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);

  const cargar = async () => {
    if (loading) return;
    setLoading(true);

    try {
     const res = await api.get(`/modelo-390?year=${year}`);
      setData(res.data);
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
          <h1 className="dashboard-title">Modelo 390</h1>
          <p className="text-muted">Resumen anual del IVA</p>
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
        <h2 className="section-title mb-4">Seleccionar ejercicio</h2>

        <div className="flex gap-4 items-end">
          <div className="flex flex-col flex-1">
            <label className="input-label">Año</label>
            <input
              type="number"
              className="input"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </div>

          <button
            onClick={cargar}
            className="btn primary"
            disabled={loading}
          >
            {loading ? "Cargando…" : "Cargar"}
          </button>
        </div>
      </div>

      {/* Resultado */}
      {data && (
        <div className="result-card animate-fade">

          <h2 className="section-title mb-4">Resumen anual</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="iva-box green">
              <h3 className="iva-title">Base imponible</h3>
              <p className="iva-value">{data.base} €</p>
            </div>

            <div className="iva-box blue">
              <h3 className="iva-title">IVA devengado</h3>
              <p className="iva-value">{data.iva} €</p>
            </div>

            <div className="iva-box purple">
              <h3 className="iva-title">Total facturado</h3>
              <p className="iva-value">{data.total} €</p>
            </div>

          </div>

          <div className="mt-8 p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
            <p className="text-lg font-semibold">Movimientos registrados</p>
            <p className="text-3xl font-bold mt-1">{data.movimientos}</p>
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
}
