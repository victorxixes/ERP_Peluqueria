import { useEffect, useState } from "react";
import { api } from "../utils/api";

export const HistoricoPage = () => {
  const [historico, setHistorico] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    tipo: "",
    fecha: "",
    descripcion: "",
    cantidad: "",
  });

  const cargar = async () => {
    const r = await api.get("/historico");
    setHistorico(r.data);
  };

  const crear = async () => {
    await api.post("/historico", form);
    setForm({ tipo: "", fecha: "", descripcion: "", cantidad: "" });
    setShowModal(false);
    cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="p-10 bg-white text-black min-h-screen space-y-10">

      {/* Título */}
      <div>
        <h1 className="text-4xl font-bold">Histórico</h1>
        <p className="text-gray-600 mt-1">Registro histórico de movimientos del ERP</p>
      </div>

      {/* Botón */}
      <button
        onClick={() => setShowModal(true)}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Nuevo registro
      </button>

      {/* Tabla clara premium */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600">
              <th className="py-2">Tipo</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((h) => (
              <tr key={h.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2">{h.tipo}</td>
                <td>{h.fecha}</td>
                <td>{h.descripcion}</td>
                <td>{h.cantidad} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal claro premium */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Nuevo registro</h2>

            <div className="space-y-4">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type={key === "fecha" ? "date" : "text"}
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
                onClick={crear}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
