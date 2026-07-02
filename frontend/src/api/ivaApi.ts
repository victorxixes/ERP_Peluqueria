import api from "../utils/api";

export const getIVAResumen = async (desde: string, hasta: string) => {
  const res = await api.get(`/iva/resumen?desde=${desde}&hasta=${hasta}`);
  return res.data;
};

export const getIVAPrevision = async () => {
  const res = await api.get(`/iva/prevision`);
  return res.data;
};
