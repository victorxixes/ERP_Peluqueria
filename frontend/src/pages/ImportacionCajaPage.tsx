import React, { useState } from "react";
import api from "../utils/api";

export const ImportacionCajaPage: React.FC = () => {
  const [cajaFile, setCajaFile] = useState<File | null>(null);
  const [serviciosFile, setServiciosFile] = useState<File | null>(null);
  const [productosFile, setProductosFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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

      if (serviciosFile) {
        formData.append("servicios_excel", serviciosFile);
      }

      if (productosFile) {
        formData.append("productos_excel", productosFile);
      }

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-xl">
        <h1 className="text-2xl font-semibold tracking-wide mb-6">
          Importación de Caja Mensual
        </h1>

        <p className="text-sm text-slate-400 mb-6">
          Sube el Excel de caja del mes. Los catálogos de servicios y productos son opcionales.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Caja */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Excel de Caja (ventas)
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setCajaFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-slate-200
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-emerald-600 file:text-white
                         hover:file:bg-emerald-500
                         bg-slate-800 border border-slate-700 rounded-md"
            />
          </div>

          {/* Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Catálogo de Servicios (Opcional)
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setServiciosFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-slate-200
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-sky-600 file:text-white
                           hover:file:bg-sky-500
                           bg-slate-800 border border-slate-700 rounded-md"
              />
            </div>

            {/* Productos */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Catálogo de Productos (Opcional)
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setProductosFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-slate-200
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-indigo-600 file:text-white
                           hover:file:bg-indigo-500
                           bg-slate-800 border border-slate-700 rounded-md"
              />
            </div>
          </div>

          {/* Botón */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-2 rounded-md
                         bg-emerald-600 hover:bg-emerald-500
                         disabled:bg-slate-700 disabled:cursor-not-allowed
                         text-sm font-semibold tracking-wide"
            >
              {loading ? "Importando..." : "Importar caja"}
            </button>

            {loading && (
              <span className="text-xs text-slate-400">
                Procesando tickets, IVA y histórico…
              </span>
            )}
          </div>
        </form>

        {/* Errores */}
        {error && (
          <div className="mt-6 rounded-md border border-red-500 bg-red-950/40 p-4 text-sm">
            <p className="font-semibold mb-1">Error en la importación</p>
            <p>{error}</p>
          </div>
        )}

        {/* Resultado */}
        {resultado && (
          <div className="mt-6 rounded-md border border-emerald-500 bg-emerald-950/40 p-4 text-sm space-y-2">
            <p className="font-semibold mb-1">Resultado de la importación</p>
            <p>
              <span className="font-semibold">Tickets creados:</span>{" "}
              {resultado.resultado?.tickets_creados ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Movimientos histórico:</span>{" "}
              {resultado.resultado?.movimientos_historico ?? "-"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
