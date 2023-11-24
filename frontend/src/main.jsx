import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import LoginStatus from "../appContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoginStatus>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </LoginStatus>
  </BrowserRouter>
);
