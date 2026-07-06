import React from "react";
import React, { useEffect, useState } from "react";

const ValidacionItemsPage: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [clasificacion, setClasificacion] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [dark, setDark] = useState(true);

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
    <div className={dark ? "page dark-mode" : "page light-mode"}>

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Validación de Ítems</h1>
          <p className="text-muted">Clasifica ítems desconocidos detectados en la importación de caja</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>

      {/* Lista de ítems */}
      {items.length === 0 ? (
        <div className="status-card animate-fade">
          No hay ítems desconocidos pendientes.
        </div>
      ) : (
        <div className="items-card animate-fade">
          {items.map((item) => (
            <div key={item} className="item-row">
              <span className="item-name">{item}</span>

              <select
                className="input"
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

      {/* Botón guardar */}
      {items.length > 0 && (
        <button
          onClick={guardarCambios}
          disabled={loading}
          className="btn primary mt-6"
        >
          {loading ? "Guardando…" : "Guardar clasificación"}
        </button>
      )}

      {/* Mensaje */}
      {mensaje && (
        <div className="status-success animate-fade">
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default ValidacionItemsPage;
