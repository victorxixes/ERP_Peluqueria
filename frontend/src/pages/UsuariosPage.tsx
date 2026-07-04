import { useEffect, useState } from "react";
import api from "../utils/api";

export const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(true);

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
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Usuarios</h1>
          <p className="text-muted">Gestión de usuarios del ERP</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>

      {/* Botón */}
      <button
        onClick={() => setShowModal(true)}
        className="btn primary mb-6"
      >
        + Nuevo usuario
      </button>

      {/* Tabla premium */}
      <div className="table-container animate-fade">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>{u.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal premium */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal animate-fade">
            <h2 className="modal-title">Nuevo usuario</h2>

            <div className="modal-body">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key}
                  className="input"
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              ))}
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="btn secondary"
              >
                Cancelar
              </button>

              <button
                onClick={crear}
                className="btn primary"
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
