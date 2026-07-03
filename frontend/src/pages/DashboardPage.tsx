import { useEffect, useState } from "react";
import  api  from "../utils/api";

export const DashboardPage = () => {
  const [data, setData] = useState<any>(null);

  const cargar = async () => {
    const r = await api.get("/dashboard");
    setData(r.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  if (!data) return <p className="p-10">Cargando...</p>;

  return (
    <div className="p-10 bg-slate-900 min-h-screen text-white space-y-10">

      <h1 className="text-4xl font-bold">Dashboard Premium</h1>
      <p className="text-slate-400">Resumen fiscal y actividad del ERP</p>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-400">Ingresos del mes</h3>
          <p className="text-3xl font-bold text-green-400">{data.total_ingresos} €</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-400">Gastos del mes</h3>
          <p className="text-3xl font-bold text-red-400">{data.total_gastos} €</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-400">Beneficio</h3>
          <p className="text-3xl font-bold">{data.beneficio} €</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-400">Logs hoy</h3>
          <p className="text-3xl font-bold text-blue-400">{data.logs_hoy}</p>
        </div>

      </div>

      {/* IVA */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-400">IVA repercutido</h3>
          <p className="text-3xl font-bold text-yellow-400">{data.iva_repercutido} €</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-400">IVA soportado</h3>
          <p className="text-3xl font-bold text-yellow-400">{data.iva_soportado} €</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-400">IVA final</h3>
          <p className="text-3xl font-bold text-yellow-400">{data.iva_final} €</p>
        </div>

      </div>

    </div>
  );
};
