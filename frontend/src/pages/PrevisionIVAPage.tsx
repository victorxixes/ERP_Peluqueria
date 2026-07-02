import { useState } from "react";
import { getIVAPrevision } from "../api/ivaApi";

export default function PrevisionIVAPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    if (loading) return; // evita llamadas duplicadas
    setLoading(true);
    setError(null);

    try {
      const res = await getIVAPrevision();
      setData(res);
    } catch (err) {
      console.error(err);
      setError("Error cargando la previsión de IVA");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Previsión IVA</h1>

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
