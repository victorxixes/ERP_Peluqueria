import { useState } from "react";
import { getIVAResumen } from "../api/ivaApi";

export default function IVAPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    if (loading) return; // evita llamadas duplicadas
    setLoading(true);
    setError(null);

    try {
      const desde = "2026-01-01";
      const hasta = "2026-12-31";

      const res = await getIVAResumen(desde, hasta);
      setData(res);
    } catch (err) {
      console.error(err);
      setError("Error cargando el resumen de IVA");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Resumen IVA</h1>

      <button onClick={cargar} disabled={loading}>
        {loading ? "Calculando..." : "Calcular"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && <p>Cargando...</p>}

      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
