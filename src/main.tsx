import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./index.css";
import { AudioProvider } from "./utils/audioContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="w-screen mx-auto h-screen">
      <Routes />
    </div>
  </React.StrictMode>
);
