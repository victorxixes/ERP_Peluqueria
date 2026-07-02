import React from "react";

export const HistoricoTable = ({ movimientos, onSelect }) => {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Descripción</th>
          <th>Importe</th>
          <th>Módulo</th>
          <th>Usuario</th>
          <th>Proveedor</th>
        </tr>
      </thead>

      <tbody>
        {movimientos.map((m) => (
          <tr
            key={m.id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelect(m)}
          >
            <td>{m.fecha}</td>
            <td>{m.tipo}</td>
            <td>{m.descripcion}</td>
            <td>{m.importe} €</td>
            <td>{m.modulo}</td>
            <td>{m.usuario?.nombre || "-"}</td>
            <td>{m.proveedor?.nombre || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
