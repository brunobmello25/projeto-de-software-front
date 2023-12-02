/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import ReactDOM from "react-dom/client";
import Secretary from "./pages/secretary.tsx";
import './assets/reset.css'; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Secretary />
  </React.StrictMode>,
);
