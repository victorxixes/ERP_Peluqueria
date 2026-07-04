import { useEffect, useState } from "react";
import api from "../utils/api";

export const IVAAnualPage = () => {
  const [iva390, setIVA390] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(true);

  const [form, setForm] = useState({
    ejercicio: "",
    base_imponible_total: "",
    cuota_iva_total: "",
    operaciones_exentas: "",
    fecha_presentacion: "",
  });

  const cargar = async () => {
    const r = await api.get("/iva390");
    setIVA390(r.data);
  };

  const crear = async () => {
    await api.post("/iva390", form);
    setForm({
      ejercicio: "",
      base_imponible_total: "",
      cuota_iva_total: "",
      operaciones_exentas: "",
      fecha_presentacion: "",
    });
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
          <h1 className="dashboard-title">IVA 390</h1>
          <p className="text-muted">Resumen anual del IVA</p>
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
        + Nuevo ejercicio
      </button>

      {/* Tabla premium */}
      <div className="table-container animate-fade">
        <table className="table">
          <thead>
            <tr>
              <th>Ejercicio</th>
              <th>Base imponible total</th>
              <th>Cuota IVA total</th>
              <th>Operaciones exentas</th>
              <th>Fecha presentación</th>
            </tr>
          </thead>
          <tbody>
            {iva390.map((i) => (
              <tr key={i.id}>
                <td>{i.ejercicio}</td>
                <td>{i.base_imponible_total} €</td>
                <td>{i.cuota_iva_total} €</td>
                <td>{i.operaciones_exentas}</td>
                <td>{i.fecha_presentacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal premium */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal animate-fade">
            <h2 className="modal-title">Nuevo ejercicio</h2>

            <div className="modal-body">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type={key === "fecha_presentacion" ? "date" : "text"}
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
