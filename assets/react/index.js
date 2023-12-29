import React from "react";
import App from "./App";

import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./Store/store";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <HashRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App container={container} />
      </Provider>
    </React.StrictMode>
  </HashRouter>
);
