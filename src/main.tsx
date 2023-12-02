/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import ReactDOM from "react-dom/client";
import Secretary from "./pages/secretary.tsx";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './assets/reset.css'; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route  path={"/secretaria"} element={<Secretary/>} />
        <Route path="/" element={<Navigate to="/secretaria" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
