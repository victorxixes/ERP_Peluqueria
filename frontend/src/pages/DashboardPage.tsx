import { useEffect, useState } from "react";
import api from "../utils/api";

export const DashboardPage = () => {
  const [data, setData] = useState<any>(null);
  const [dark, setDark] = useState(true);

  const cargar = async () => {
    const r = await api.get("/dashboard/");
    setData(r.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  if (!data) {
    return (
      <div className="page">
        <div className="loading">Cargando datos…</div>
      </div>
    );
  }

  return (
    <div className={dark ? "page dark-mode" : "page light-mode"}>
      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Dashboard Premium</h1>
          <p className="text-muted">Resumen fiscal y actividad del ERP</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>

      {/* Tarjetas principales */}
      <div className="dashboard-grid">
        <div className="card animate-fade">
          <div className="card-icon bg-green-600">💶</div>
          <h3 className="card-title">Ingresos del mes</h3>
          <p className="card-value text-green">{data.total_ingresos} €</p>
        </div>

        <div className="card animate-fade">
          <div className="card-icon bg-red-600">📉</div>
          <h3 className="card-title">Gastos del mes</h3>
          <p className="card-value text-red">{data.total_gastos} €</p>
        </div>

        <div className="card animate-fade">
          <div className="card-icon bg-blue-600">📊</div>
          <h3 className="card-title">Beneficio</h3>
          <p className="card-value">{data.beneficio} €</p>
        </div>

        <div className="card animate-fade">
          <div className="card-icon bg-yellow-600">📝</div>
          <h3 className="card-title">Logs hoy</h3>
          <p className="card-value text-blue">{data.logs_hoy}</p>
        </div>
      </div>

      {/* IVA */}
      <div className="dashboard-grid">
        <div className="card animate-fade">
          <div className="card-icon bg-yellow-500">💸</div>
          <h3 className="card-title">IVA repercutido</h3>
          <p className="card-value text-yellow">{data.iva_repercutido} €</p>
        </div>

        <div className="card animate-fade">
          <div className="card-icon bg-yellow-500">💰</div>
          <h3 className="card-title">IVA soportado</h3>
          <p className="card-value text-yellow">{data.iva_soportado} €</p>
        </div>

        <div className="card animate-fade">
          <div className="card-icon bg-yellow-500">⚖️</div>
          <h3 className="card-title">IVA final</h3>
          <p className="card-value text-yellow">{data.iva_final} €</p>
        </div>
      </div>

      {/* Gráfico mensual */}
      {data.ingresos_mensuales && data.gastos_mensuales && (
        <div className="section">
          <h2 className="section-title">Evolución mensual</h2>

          <div className="chart-container">
            {data.ingresos_mensuales.map((ing: number, i: number) => {
              const g = data.gastos_mensuales[i];
              const max = Math.max(ing, g, 1);
              const ingHeight = (ing / max) * 100;
              const gasHeight = (g / max) * 100;

              return (
                <div key={i} className="chart-bar">
                  <div
                    className="chart-income"
                    style={{ height: `${ingHeight}%` }}
                  ></div>
                  <div
                    className="chart-expense"
                    style={{ height: `${gasHeight}%` }}
                  ></div>
                  <p className="chart-label">M{i + 1}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
