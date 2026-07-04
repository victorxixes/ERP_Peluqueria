import { useState } from "react";

export const ValidacionExcelPage = () => {
  const [tipo, setTipo] = useState<"ingresos" | "gastos">("ingresos");
  const [resultado, setResultado] = useState<any | null>(null);
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResultado(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`http://localhost:8000/validacion-excel/${tipo}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResultado(data);
    setLoading(false);
  };

  return (
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Validación de Excel</h1>
          <p className="text-muted">Comprueba errores y estructura de tus archivos Excel</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>

      {/* Selector + Input */}
      <div className="form-card animate-fade">

        <h2 className="section-title mb-4">Subir archivo</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col">
            <label className="input-label">Tipo de documento</label>
            <select
              className="input"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as any)}
            >
              <option value="ingresos">Ingresos</option>
              <option value="gastos">Gastos</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="input-label">Archivo Excel</label>
            <input
              type="file"
              accept=".xlsx,.xls"
              className="input"
              onChange={onChangeFile}
            />
          </div>

        </div>

        <p className="text-muted mt-4 text-sm">
          Valida columnas obligatorias, duplicados y valores incorrectos.
        </p>

        {loading && (
          <p className="loading-text mt-4">Validando archivo…</p>
        )}
      </div>

      {/* Resultado */}
      {resultado && (
        <div className="result-card animate-fade">

          <h2 className="section-title mb-4">Resultado de la validación</h2>

          {/* Resumen */}
          <div className="iva-box blue mb-6">
            <h3 className="iva-title">Filas detectadas</h3>
            <p className="iva-value">{resultado.filas}</p>
          </div>

          {/* Errores */}
          <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
            <p className="text-lg font-semibold mb-2">Errores encontrados</p>

            {resultado.errores.length === 0 ? (
              <p className="text-green-600 font-semibold">No se han encontrado errores.</p>
            ) : (
              <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
                {resultado.errores.map((err: string, idx: number) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
