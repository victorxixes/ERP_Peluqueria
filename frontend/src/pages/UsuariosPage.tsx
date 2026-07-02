import { useEffect, useState } from "react";
import { api } from "../utils/api";

export const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "",
    telefono: "",
  });

  const cargar = async () => {
    const r = await api.get("/usuarios");
    setUsuarios(r.data);
  };

  const crear = async () => {
    await api.post("/usuarios", form);
    setForm({ nombre: "", email: "", rol: "", telefono: "" });
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
        <h1 className="text-4xl font-bold">Usuarios</h1>
        <p className="text-gray-600 mt-1">Gestión de usuarios del ERP</p>
      </div>

      {/* Botón */}
      <button
        onClick={() => setShowModal(true)}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Nuevo usuario
      </button>

      {/* Tabla clara premium */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600">
              <th className="py-2">Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2">{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>{u.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal claro premium */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Nuevo usuario</h2>

            <div className="space-y-4">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type="text"
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
