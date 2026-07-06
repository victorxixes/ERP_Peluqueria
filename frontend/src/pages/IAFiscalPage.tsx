import { useEffect, useState } from "react";
import api from "../utils/api";

export const IAFiscalPage = () => {
  const [analisis, setAnalisis] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(true);

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
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">IA Fiscal</h1>
          <p className="text-muted">Análisis inteligente de tu situación fiscal</p>
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
        + Nuevo análisis
      </button>

      {/* Tarjeta de análisis */}
      {analisis && (
        <div className="analysis-card animate-fade">

          <h2 className="section-title">Resultado del análisis</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="analysis-box">
              <h3 className="analysis-title">Resumen</h3>
              <p className="analysis-text">{analisis.resumen}</p>
            </div>

            <div className="analysis-box">
              <h3 className="analysis-title">Riesgos detectados</h3>
              <ul className="analysis-list">
                {analisis.riesgos.map((r: string, idx: number) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="analysis-box col-span-2">
              <h3 className="analysis-title">Recomendaciones</h3>
              <ul className="analysis-list">
                {analisis.recomendaciones.map((r: string, idx: number) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Modal premium */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal animate-fade">
            <h2 className="modal-title">Nuevo análisis fiscal</h2>

            <div className="modal-body">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type="number"
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
                onClick={generar}
                className="btn primary"
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
