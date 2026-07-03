import { useState } from "react";
import { getIVAResumen } from "../api/ivaApi";

export const IVAPage = () => {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [data, setData] = useState<any>(null);

  const cargarResumen = async () => {
    const result = await getIVAResumen(desde, hasta);
    setData(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Resumen IVA</h1>

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

      <button onClick={cargarResumen}>Cargar resumen</button>

      {data && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};
