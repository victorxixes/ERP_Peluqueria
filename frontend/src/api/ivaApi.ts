import api from "../utils/api";

// Resumen IVA
export const getIVAResumen = async (desde: string, hasta: string) => {
  const response = await api.get(`/iva/resumen/?desde=${desde}&hasta=${hasta}`);
  return response.data;
};

// Detalle IVA
export const getIVADetalle = async (desde: string, hasta: string) => {
  const response = await api.get(`/iva/detalle/?desde=${desde}&hasta=${hasta}`);
  return response.data;
};

// Previsión IVA
export const getIVAPrevision = async (desde: string, hasta: string) => {
  const response = await api.get(`/iva/prevision/?desde=${desde}&hasta=${hasta}`);
  return response.data;
};
