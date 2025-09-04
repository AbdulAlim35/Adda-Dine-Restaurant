import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routing from "./Routing.jsx";
import { BrowserRouter } from "react-router-dom";
import TheemProvider from "./contex/TheemProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TheemProvider>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </TheemProvider>
  </StrictMode>
);
