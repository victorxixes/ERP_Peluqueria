import { useState } from "react";

export const ValidacionExcelPage = () => {
  const [tipo, setTipo] = useState<"ingresos" | "gastos">("ingresos");
  const [resultado, setResultado] = useState<any | null>(null);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`http://localhost:8000/validacion-excel/${tipo}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResultado(data);
  };

  return (
    <div className="p-10 bg-white text-black min-h-screen space-y-10">

      {/* Título */}
      <div>
        <h1 className="text-4xl font-bold">Validación de Excel</h1>
        <p className="text-gray-600 mt-1">Comprueba errores y estructura de tus archivos Excel</p>
      </div>

      {/* Selector + Input */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">

        <div className="flex gap-4 items-center">
          <select
            className="p-2 border border-gray-300 rounded-lg bg-white"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as any)}
          >
            <option value="ingresos">Ingresos</option>
            <option value="gastos">Gastos</option>
          </select>

          <input
            type="file"
            accept=".xlsx,.xls"
            className="p-2 border border-gray-300 rounded-lg bg-white"
            onChange={onChangeFile}
          />
        </div>

        <p className="text-gray-500 text-sm">
          Selecciona el tipo de documento y sube tu archivo Excel para validar columnas, duplicados y valores incorrectos.
        </p>
      </div>

      {/* Resultado */}
      {resultado && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

          <h2 className="text-2xl font-semibold">Resultado de la validación</h2>

          {/* Resumen */}
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">Filas detectadas:</p>
            <p className="text-gray-700">{resultado.filas}</p>
          </div>

          {/* Errores */}
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <p className="text-lg font-semibold mb-2">Errores encontrados:</p>

            {resultado.errores.length === 0 ? (
              <p className="text-green-600 font-semibold">No se han encontrado errores.</p>
            ) : (
              <ul className="list-disc ml-5 text-gray-700">
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
