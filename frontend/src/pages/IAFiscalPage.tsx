import { useEffect, useState } from "react";
import api from "../utils/api";

export const IAFiscalPage = () => {
  const [analisis, setAnalisis] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    ingresos: "",
    gastos: "",
    activos: "",
    nominas: "",
  });

  const cargar = async () => {
    const r = await api.get("/ia/fiscal");
    setAnalisis(r.data);
  };

  const generar = async () => {
    const r = await api.post("/ia/fiscal", form);
    setAnalisis(r.data);
    setForm({ ingresos: "", gastos: "", activos: "", nominas: "" });
    setShowModal(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="p-10 bg-white text-black min-h-screen space-y-10">

      {/* Título */}
      <div>
        <h1 className="text-4xl font-bold">IA Fiscal</h1>
        <p className="text-gray-600 mt-1">Análisis inteligente de tu situación fiscal</p>
      </div>

      {/* Botón */}
      <button
        onClick={() => setShowModal(true)}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Nuevo análisis
      </button>

      {/* Tarjeta de análisis */}
      {analisis && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

          <h2 className="text-2xl font-semibold">Resultado del análisis</h2>

          <div className="grid grid-cols-2 gap-6">

            <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Resumen</h3>
              <p className="text-gray-700">{analisis.resumen}</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Riesgos detectados</h3>
              <ul className="list-disc ml-5 text-gray-700">
                {analisis.riesgos.map((r: string, idx: number) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg shadow-sm col-span-2">
              <h3 className="text-lg font-semibold mb-2">Recomendaciones</h3>
              <ul className="list-disc ml-5 text-gray-700">
                {analisis.recomendaciones.map((r: string, idx: number) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Modal claro premium */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Nuevo análisis fiscal</h2>

            <div className="space-y-4">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type="number"
                  placeholder={key}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>

              <button
                onClick={generar}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generar análisis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
