import { useEffect, useState } from "react";
import api from "../utils/api";

export const ConfiguracionFiscalPage = () => {
  const [config, setConfig] = useState<any | null>(null);
  const [dark, setDark] = useState(true);
  const [estado, setEstado] = useState("");

  const cargar = async () => {
    const r = await api.get("/config/fiscal");
    setConfig(r.data);
  };

  const actualizar = async () => {
    setEstado("Guardando cambios…");
    await api.post("/config/fiscal", config);
    setEstado("Cambios guardados correctamente");
    setTimeout(() => setEstado(""), 3000);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Configuración Fiscal</h1>
          <p className="text-muted">Ajustes fiscales del ERP</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>

      {/* Estado */}
      {estado && (
        <div className="status-card animate-fade">
          <p>{estado}</p>
        </div>
      )}

      {/* Tarjeta de configuración */}
      {config && (
        <div className="config-card animate-fade">

          <h2 className="section-title mb-4">Parámetros fiscales</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(config).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="input-label">{key}</label>
                <input
                  type="text"
                  className="input"
                  value={config[key]}
                  onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <button
            onClick={actualizar}
            className="btn primary mt-6"
          >
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
};
