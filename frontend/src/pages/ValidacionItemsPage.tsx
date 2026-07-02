import React, { useEffect, useState } from "react";

const ValidacionItemsPage: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [clasificacion, setClasificacion] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Cargar ítems desconocidos desde el backend
  useEffect(() => {
    const cargar = async () => {
      const res = await fetch("/catalogo/desconocidos");
      const data = await res.json();
      setItems(data.items || []);
    };
    cargar();
  }, []);

  const actualizarClasificacion = (item: string, tipo: string) => {
    setClasificacion((prev) => ({ ...prev, [item]: tipo }));
  };

  const guardarCambios = async () => {
    setLoading(true);
    setMensaje(null);

    const res = await fetch("/catalogo/clasificar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clasificacion),
    });

    const data = await res.json();
    setLoading(false);
    setMensaje(data.mensaje || "Clasificación guardada correctamente.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">Validación de Ítems Desconocidos</h1>

      <p className="text-slate-400 mb-6">
        Estos ítems han aparecido en la importación de caja pero no existen en el catálogo.
        Clasifícalos para que el sistema aprenda y no vuelvan a aparecer como desconocidos.
      </p>

      {items.length === 0 ? (
        <p className="text-slate-500">No hay ítems desconocidos pendientes.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item}
              className="bg-slate-900 border border-slate-700 p-4 rounded-md flex items-center justify-between"
            >
              <span className="font-medium">{item}</span>

              <select
                className="bg-slate-800 border border-slate-700 rounded px-3 py-1"
                value={clasificacion[item] || ""}
                onChange={(e) => actualizarClasificacion(item, e.target.value)}
              >
                <option value="">Seleccionar…</option>
                <option value="servicio">Servicio</option>
                <option value="producto">Producto</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <button
          onClick={guardarCambios}
          disabled={loading}
          className="mt-6 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-md font-semibold"
        >
          {loading ? "Guardando…" : "Guardar clasificación"}
        </button>
      )}

      {mensaje && (
        <div className="mt-4 p-4 bg-emerald-900/40 border border-emerald-600 rounded-md">
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default ValidacionItemsPage;
