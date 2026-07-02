import { useEffect, useState } from "react";
import { api } from "../utils/api";

export const ConfiguracionFiscalPage = () => {
  const [config, setConfig] = useState<any | null>(null);

  const cargar = async () => {
    const r = await api.get("/config/fiscal");
    setConfig(r.data);
  };

  const actualizar = async () => {
    await api.post("/config/fiscal", config);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="p-10 bg-white text-black min-h-screen space-y-10">

      <h1 className="text-4xl font-bold">Configuración Fiscal</h1>
      <p className="text-gray-600">Ajustes fiscales del ERP</p>

      {config && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

          <div className="space-y-4">
            {Object.keys(config).map((key) => (
              <input
                key={key}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={config[key]}
                onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
              />
            ))}
          </div>

          <button
            onClick={actualizar}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Guardar cambios
          </button>

        </div>
      )}
    </div>
  );
};
