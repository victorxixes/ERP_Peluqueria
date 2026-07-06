import React from "react";
import { useEffect, useState } from "react";
import api from "../utils/api";

export const ProveedoresPage = () => {
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(true);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    categoria: "",
  });

  const cargar = async () => {
    const r = await api.get("/proveedores");
    setProveedores(r.data);
  };

  const crear = async () => {
    await api.post("/proveedores", form);
    setForm({ nombre: "", telefono: "", email: "", direccion: "", categoria: "" });
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
          <h1 className="dashboard-title">Proveedores</h1>
          <p className="text-muted">Gestión de proveedores del ERP</p>
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
        + Nuevo proveedor
      </button>

      {/* Tabla premium */}
      <div className="table-container animate-fade">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.telefono}</td>
                <td>{p.email}</td>
                <td>{p.direccion}</td>
                <td>{p.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal premium */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal animate-fade">
            <h2 className="modal-title">Nuevo proveedor</h2>

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
