import React from "react";
import App from "./containers/App";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
);
