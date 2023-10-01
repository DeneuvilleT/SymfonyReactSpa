import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
