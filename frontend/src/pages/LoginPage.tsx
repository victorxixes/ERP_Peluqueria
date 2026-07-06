import { useState } from "react";
import api from "../utils/api";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { access_token, refresh_token } = res.data;

      // Guardar tokens
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      // Redirigir al dashboard
      window.location.href = "/dashboard";

    } catch (err: any) {
      console.error(err);
      setError("Credenciales incorrectas o usuario no encontrado.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-card">

        <h1 className="login-title">Iniciar sesión</h1>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
};
