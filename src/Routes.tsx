import { useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";
import { AudioProvider } from "./utils/audioContext";

const Routes = () => (
  <BrowserRouter>
    <AudioProvider>
      <Switch>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Switch>
    </AudioProvider>
  </BrowserRouter>
);

export default Routes;
