import { useEffect, useState } from "react";
import api from "../utils/api";

export const IRPFPage = () => {
  const [previsiones, setPrevisiones] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(true);

  const [form, setForm] = useState({
    año: "",
    ingresos_totales: "",
    gastos_totales: "",
    amortizaciones: "",
    beneficio_neto: "",
    irpf_estimado: "",
  });

  const cargar = async () => {
    const r = await api.get("/irpf/prevision");
    setPrevisiones(r.data);
  };

  const crear = async () => {
    await api.post("/irpf/prevision", form);
    setForm({
      año: "",
      ingresos_totales: "",
      gastos_totales: "",
      amortizaciones: "",
      beneficio_neto: "",
      irpf_estimado: "",
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
          <h1 className="dashboard-title">IRPF</h1>
          <p className="text-muted">Previsión anual del IRPF</p>
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
        + Nueva previsión
      </button>

      {/* Tabla premium */}
      <div className="table-container animate-fade">
        <table className="table">
          <thead>
            <tr>
              <th>Año</th>
              <th>Ingresos totales</th>
              <th>Gastos totales</th>
              <th>Amortizaciones</th>
              <th>Beneficio neto</th>
              <th>IRPF estimado</th>
            </tr>
          </thead>
          <tbody>
            {previsiones.map((p) => (
              <tr key={p.id}>
                <td>{p.año}</td>
                <td>{p.ingresos_totales} €</td>
                <td>{p.gastos_totales} €</td>
                <td>{p.amortizaciones} €</td>
                <td>{p.beneficio_neto} €</td>
                <td>{p.irpf_estimado} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal premium */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal animate-fade">
            <h2 className="modal-title">Nueva previsión</h2>

            <div className="modal-body">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type={key === "año" ? "number" : "text"}
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
