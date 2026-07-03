import { useEffect, useState } from "react";
import  api  from "../utils/api";

export const NominasPage = () => {
  const [nominas, setNominas] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    empleado: "",
    fecha: "",
    salario_bruto: "",
    salario_neto: "",
    categoria: "",
  });

  const cargar = async () => {
    const r = await api.get("/nominas");
    setNominas(r.data);
  };

  const crear = async () => {
    await api.post("/nominas", form);
    setForm({ empleado: "", fecha: "", salario_bruto: "", salario_neto: "", categoria: "" });
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
        <h1 className="text-4xl font-bold">Nóminas</h1>
        <p className="text-gray-600 mt-1">Gestión de nóminas del ERP</p>
      </div>

      {/* Botón */}
      <button
        onClick={() => setShowModal(true)}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Nueva nómina
      </button>

      {/* Tabla clara premium */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600">
              <th className="py-2">Empleado</th>
              <th>Fecha</th>
              <th>Salario bruto</th>
              <th>Salario neto</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {nominas.map((n) => (
              <tr key={n.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2">{n.empleado}</td>
                <td>{n.fecha}</td>
                <td>{n.salario_bruto} €</td>
                <td>{n.salario_neto} €</td>
                <td>{n.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal claro premium */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Nueva nómina</h2>

            <div className="space-y-4">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type={key === "fecha" ? "date" : "text"}
                  placeholder={key.replace("_", " ")}
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
