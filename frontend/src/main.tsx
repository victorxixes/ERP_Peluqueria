import { Sidebar } from "../components/Sidebar";

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";
import "./styles/sidebar.css";
import "./styles/dashboard.css";
import "./styles/cards.css";
import "./styles/tables.css";
import "./styles/forms.css";
import "./styles/buttons.css";
import "./styles/layout.css";
import "./styles/loading.css";

import "./styles/iaFiscal.css";
import "./styles/irpf.css";
import "./styles/ivaAnual.css";
import "./styles/iva.css";
import "./styles/importacionCaja.css";
import "./styles/configuracionFiscal.css";
import "./styles/informes.css";
import "./styles/ingresos.css";
import "./styles/logs.css";
import "./styles/modelo390.css";
import "./styles/nominas.css";
import "./styles/proveedores.css";
import "./styles/usuarios.css";
import "./styles/validacionexcel.css";
import "./styles/validacionitems.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
