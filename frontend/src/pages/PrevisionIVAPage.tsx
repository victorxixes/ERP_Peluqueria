import { useState } from "react";
import { getIVAPrevision } from "../api/ivaApi";

export const PrevisionIVAPage = () => {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [data, setData] = useState<any>(null);

  const cargarPrevision = async () => {
    const result = await getIVAPrevision(desde, hasta);
    setData(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Previsión IVA</h1>

      <div>
        <label>Desde:</label>
        <input
          type="date"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
        />
      </div>

      <div>
        <label>Hasta:</label>
        <input
          type="date"
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
        />
      </div>

      <button onClick={cargarPrevision}>Cargar previsión</button>

      {data && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};
