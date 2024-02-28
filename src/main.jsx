import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import StoresProvider from "./contexts/storesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoresProvider>
      <App />
    </StoresProvider>
  </React.StrictMode>
);
