import React from "react";

export const HistoricoFilters = ({ filters, setFilters }) => {
  const update = (field, value) =>
    setFilters({ ...filters, [field]: value });

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={filters.tipo}
        onChange={(e) => update("tipo", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Tipo</option>
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
        <option value="activo">Activo</option>
        <option value="servicio">Servicio</option>
        <option value="iva">IVA</option>
      </select>

      <select
        value={filters.modulo}
        onChange={(e) => update("modulo", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Módulo</option>
        <option value="TPV">TPV</option>
        <option value="Agenda">Agenda</option>
        <option value="IVA">IVA</option>
        <option value="Productos">Productos</option>
      </select>

      <input
        type="date"
        value={filters.desde}
        onChange={(e) => update("desde", e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="date"
        value={filters.hasta}
        onChange={(e) => update("hasta", e.target.value)}
        className="border p-2 rounded"
      />
    </div>
  );
};
