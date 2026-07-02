import api from "../utils/api";

export const getTickets = async () => {
  const res = await api.get("/historico");
  return res.data;
};

export const getTicketDetalle = async (ticketId: number) => {
  const res = await api.get(`/historico/${ticketId}`);
  return res.data;
};
