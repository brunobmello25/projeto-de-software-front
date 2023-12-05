/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import ReactDOM from "react-dom/client";
import Appointment from "./pages/secretary/appointment/index.tsx";
import CrudUsers from "./pages/admin/users/index.tsx";
import './assets/reset.css'; 
import Login from "./pages/login/index.tsx";
import Secretary from "./pages/secretary/crudPacientes/index.tsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./assets/reset.css";
import "./index.css";
import Product from "./pages/products/stock/index.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={"/secretaria/CRUD"} element={<Secretary/>} />
        <Route path={"/secretaria/agendar"} element={<Appointment/>} />
        <Route path={"/admin/gerenciarUsuarios"} element={<CrudUsers/>} />
        <Route path={"/produtos"} element={<Product/>} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
