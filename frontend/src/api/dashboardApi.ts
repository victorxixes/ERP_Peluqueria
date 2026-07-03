import api from "../utils/api";

export const getDashboard = async () => {
  const res = await api.get("/dashboard/");
  return res.data;
};
