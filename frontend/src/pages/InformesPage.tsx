import { useEffect, useState } from "react";
import  api  from "../utils/api";

export const InformesPage = () => {
  const [informes, setInformes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  const generarCierreMensual = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      await api.post("/informes/generar-cierre-mensual", {
        year: 2026,
        month: 6,
      });
      cargar(); // refresca la tabla
    } catch (err) {
      console.error(err);
      setError("Error generando cierre mensual");
    }

    setLoading(false);
  };

  const generarCierreTrimestral = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      await api.post("/informes/generar-cierre-trimestral", {
        year: 2026,
        quarter: 2,
      });
      cargar();
    } catch (err) {
      console.error(err);
      setError("Error generando cierre trimestral");
    }

    setLoading(false);
  };

  const generarCierreAnual = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      await api.post("/informes/generar-cierre-anual", {
        year: 2026,
      });
      cargar();
    } catch (err) {
      console.error(err);
      setError("Error generando cierre anual");
    }

    setLoading(false);
  };

  const generarModelo390 = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      await api.post("/informes/generar-modelo-390", {
        year: 2026,
      });
      cargar();
    } catch (err) {
      console.error(err);
      setError("Error generando Modelo 390");
    }

    setLoading(false);
  };

  const generarPrevisionIVA = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      await api.post("/informes/generar-prevision-iva", {
        year: 2026,
        month: 6,
      });
      cargar();
    } catch (err) {
      console.error(err);
      setError("Error generando previsión de IVA");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 bg-white text-black min-h-screen space-y-10">

      <h1 className="text-4xl font-bold">Informes</h1>
      <p className="text-gray-600">Generación y descarga de informes</p>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* BOTONES DE CIERRE FISCAL */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={generarCierreMensual}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Generar cierre mensual
        </button>

        <button
          onClick={generarCierreTrimestral}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Generar cierre trimestral
        </button>

        <button
          onClick={generarCierreAnual}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Generar cierre anual
        </button>

        <button
          onClick={generarModelo390}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Generar Modelo 390
        </button>

        <button
          onClick={generarPrevisionIVA}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Generar Previsión IVA
        </button>
      </div>

      {/* TABLA DE INFORMES */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600">
              <th className="py-2">Nombre</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {informes.map((i) => (
              <tr key={i.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2">{i.nombre}</td>
                <td>{i.fecha}</td>
                <td>
                  <a
                    href={`http://localhost:8000/informes/${i.id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
