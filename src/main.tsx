/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import ReactDOM from "react-dom/client";
import Secretary from "./pages/secretary/crudPacientes/index.tsx";
import Appointment from "./pages/secretary/appointment/index.tsx";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './assets/reset.css'; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route  path={"/secretaria/CRUD"} element={<Secretary/>} />
        <Route path={"/secretaria/agendar"} element={<Appointment/>} />
        <Route path="/" element={<Navigate to="/secretaria/CRUD" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
