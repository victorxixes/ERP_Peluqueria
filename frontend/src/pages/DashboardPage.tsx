import React from "react";
import { useEffect, useState } from "react";
import api from "../utils/api";

export const DashboardPage = () => {
  const [data, setData] = useState<any>(null);

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
    <div className="page light-mode">

      {/* Header */}
      <div className="section flex justify-between items-center">
        <div>
          <h1 className="dashboard-title">Dashboard Premium</h1>
          <p className="text-muted">Resumen fiscal y actividad del ERP</p>
        </div>
      </div>

      {/* Tarjetas principales */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-icon">💶</div>
          <h3 className="dashboard-card-title">Ingresos del mes</h3>
          <p className="dashboard-card-value">{data.total_ingresos} €</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">📉</div>
          <h3 className="dashboard-card-title">Gastos del mes</h3>
          <p className="dashboard-card-value">{data.total_gastos} €</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">📊</div>
          <h3 className="dashboard-card-title">Beneficio</h3>
          <p className="dashboard-card-value">{data.beneficio} €</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">📝</div>
          <h3 className="dashboard-card-title">Logs hoy</h3>
          <p className="dashboard-card-value">{data.logs_hoy}</p>
        </div>
      </div>

      {/* IVA */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-icon">💸</div>
          <h3 className="dashboard-card-title">IVA repercutido</h3>
          <p className="dashboard-card-value">{data.iva_repercutido} €</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">💰</div>
          <h3 className="dashboard-card-title">IVA soportado</h3>
          <p className="dashboard-card-value">{data.iva_soportado} €</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">⚖️</div>
          <h3 className="dashboard-card-title">IVA final</h3>
          <p className="dashboard-card-value">{data.iva_final} €</p>
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
