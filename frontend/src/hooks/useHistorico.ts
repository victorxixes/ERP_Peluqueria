import { useEffect, useState } from "react";
import { getTickets, getTicketDetalle } from "../api/historicoApi";

export const useHistorico = () => {
  const [tickets, setTickets] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarTickets = async () => {
    setLoading(true);
    const data = await getTickets();
    setTickets(data);
    setLoading(false);
  };

  const cargarDetalle = async (ticketId: number) => {
    setLoading(true);
    const data = await getTicketDetalle(ticketId);
    setDetalle(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  return {
    tickets,
    detalle,
    loading,
    cargarTickets,
    cargarDetalle,
  };
};
