import { useState } from "react";
import api from "../utils/api";

export default function Modelo390Page() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await api.get(`/iva/390/${year}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Modelo 390</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Año: </label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <button onClick={cargar}>Cargar</button>
      </div>

      {loading && <p>Cargando...</p>}

      {data && (
        <div>
          <h2>Resumen anual</h2>
          <p><strong>Año:</strong> {data.year}</p>
          <p><strong>Base imponible:</strong> {data.base} €</p>
          <p><strong>IVA devengado:</strong> {data.iva} €</p>
          <p><strong>Total facturado:</strong> {data.total} €</p>
          <p><strong>Nº movimientos:</strong> {data.movimientos}</p>

          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
