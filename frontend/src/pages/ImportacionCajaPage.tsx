import React from "react";
import api from "../utils/api";

export const ImportacionCajaPage: React.FC = () => {
  const [cajaFile, setCajaFile] = useState<File | null>(null);
  const [serviciosFile, setServiciosFile] = useState<File | null>(null);
  const [productosFile, setProductosFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dark, setDark] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResultado(null);

    if (!cajaFile) {
      setError("Debes seleccionar el Excel de Caja (ventas).");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("caja_excel", cajaFile);

      if (serviciosFile) formData.append("servicios_excel", serviciosFile);
      if (productosFile) formData.append("productos_excel", productosFile);

      const res = await api.post("/importar-caja/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResultado(res.data);

    } catch (err: any) {
      console.error(err);
      setError("Error al importar la caja.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Importación de Caja Mensual</h1>
          <p className="text-muted">Sube el Excel de caja y reconstruye tickets, IVA y movimientos.</p>
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
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Caja */}
          <div>
            <label className="input-label">Excel de Caja (ventas)</label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setCajaFile(e.target.files?.[0] || null)}
              className="input-file emerald"
            />
          </div>

          {/* Servicios y Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="input-label">Catálogo de Servicios (Opcional)</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setServiciosFile(e.target.files?.[0] || null)}
                className="input-file sky"
              />
            </div>

            <div>
              <label className="input-label">Catálogo de Productos (Opcional)</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setProductosFile(e.target.files?.[0] || null)}
                className="input-file indigo"
              />
            </div>

          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="btn primary w-full"
          >
            {loading ? "Importando…" : "Importar caja"}
          </button>

          {loading && (
            <p className="loading-text">Procesando tickets, IVA y movimientos…</p>
          )}
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="status-error animate-fade">
          <p className="font-semibold">Error en la importación</p>
          <p>{error}</p>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div className="result-card animate-fade">

          <h2 className="section-title mb-4">Resultado de la importación</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="result-box emerald">
              <h3 className="result-title">Tickets creados</h3>
              <p className="result-value">{resultado.resultado?.tickets_creados ?? "-"}</p>
            </div>

            <div className="result-box blue">
              <h3 className="result-title">Movimientos histórico</h3>
              <p className="result-value">{resultado.resultado?.movimientos_historico ?? "-"}</p>
            </div>

          </div>

          {/* JSON opcional */}
          <details className="json-details">
            <summary className="json-summary">Ver JSON completo</summary>
            <pre className="json-pre">
              {JSON.stringify(resultado, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};
