import axios from "axios";

const api = axios.create({
  baseURL: "https://erp-peluqueria.onrender.com",
});

export default api;


// Añadir token a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejo de expiración del token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Si el token expiró → refrescar
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) throw new Error("No refresh token");

        const res = await axios.post(
          "https://erp-peluqueria.onrender.com/auth/refresh",
          { refresh_token: refresh }
        );

        const newToken = res.data.access_token;
        localStorage.setItem("access_token", newToken);

        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
