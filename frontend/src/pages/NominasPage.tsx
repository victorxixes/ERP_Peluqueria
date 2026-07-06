import { useEffect, useState } from "react";
import api from "../utils/api";

export const NominasPage = () => {
  const [nominas, setNominas] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(true);

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
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Nóminas</h1>
          <p className="text-muted">Gestión de nóminas del ERP</p>
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
        + Nueva nómina
      </button>

      {/* Tabla premium */}
      <div className="table-container animate-fade">
        <table className="table">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Fecha</th>
              <th>Salario bruto</th>
              <th>Salario neto</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {nominas.map((n) => (
              <tr key={n.id}>
                <td>{n.empleado}</td>
                <td>{n.fecha}</td>
                <td>{n.salario_bruto} €</td>
                <td>{n.salario_neto} €</td>
                <td>{n.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal premium */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal animate-fade">
            <h2 className="modal-title">Nueva nómina</h2>

            <div className="modal-body">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type={key === "fecha" ? "date" : "text"}
                  placeholder={key.replace("_", " ")}
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
