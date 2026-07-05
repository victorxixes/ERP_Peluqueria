import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./layout/Layout";

import { DashboardPage } from "./pages/DashboardPage";
import { IngresosPage } from "./pages/IngresosPage";
import { GastosPage } from "./pages/GastosPage";
import { ProveedoresPage } from "./pages/ProveedoresPage";
import { ActivosPage } from "./pages/ActivosPage";
import { NominasPage } from "./pages/NominasPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { HistoricoPage } from "./pages/HistoricoPage";
import { InformesPage } from "./pages/InformesPage";
import { ConfiguracionFiscalPage } from "./pages/ConfiguracionFiscalPage";
import { PrevisionIVAPage } from "./pages/PrevisionIVAPage";
import { IVAPage } from "./pages/IVAPage";
import { IVAAnualPage } from "./pages/IVAAnualPage";
import { IRPFPage } from "./pages/IRPFPage";
import { IAFiscalPage } from "./pages/IAFiscalPage";
import { ValidacionExcelPage } from "./pages/ValidacionExcelPage";
import { LogsPage } from "./pages/LogsPage";
import { BackupPage } from "./pages/BackupPage";
import { ImportacionCajaPage } from "./pages/ImportacionCajaPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/ingresos" element={<IngresosPage />} />
          <Route path="/gastos" element={<GastosPage />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route path="/activos" element={<ActivosPage />} />
          <Route path="/nominas" element={<NominasPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/logs" element={<LogsPage />} />

          <Route path="/historico" element={<HistoricoPage />} />
          <Route path="/informes" element={<InformesPage />} />

          <Route path="/configuracion-fiscal" element={<ConfiguracionFiscalPage />} />
          <Route path="/prevision-iva" element={<PrevisionIVAPage />} />
          <Route path="/iva" element={<IVAPage />} />
          <Route path="/iva-anual" element={<IVAAnualPage />} />

          <Route path="/irpf" element={<IRPFPage />} />
          <Route path="/ia-fiscal" element={<IAFiscalPage />} />

          <Route path="/validacion-excel" element={<ValidacionExcelPage />} />
          <Route path="/backup" element={<BackupPage />} />
          <Route path="/importacion-caja" element={<ImportacionCajaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
