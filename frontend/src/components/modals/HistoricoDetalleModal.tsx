import React from "react";

export const HistoricoDetalleModal = ({ movimiento, onClose }) => {
  if (!movimiento) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Detalle del Movimiento</h2>

        <p><strong>Fecha:</strong> {movimiento.fecha}</p>
        <p><strong>Tipo:</strong> {movimiento.tipo}</p>
        <p><strong>Descripción:</strong> {movimiento.descripcion}</p>
        <p><strong>Importe:</strong> {movimiento.importe} €</p>
        <p><strong>IVA:</strong> {movimiento.iva || "-"}</p>
        <p><strong>Módulo:</strong> {movimiento.modulo}</p>
        <p><strong>Origen ID:</strong> {movimiento.origen_id}</p>
        <p><strong>Usuario:</strong> {movimiento.usuario?.nombre || "-"}</p>
        <p><strong>Proveedor:</strong> {movimiento.proveedor?.nombre || "-"}</p>

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
