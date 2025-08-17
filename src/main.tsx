import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./components";
import { BrowserRouter } from "react-router-dom";
import ReactDom from "react-dom/client";

ReactDom.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
);
