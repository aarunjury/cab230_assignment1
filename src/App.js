import "bootstrap/dist/css/bootstrap.min.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VolcanoesList from "./pages/VolcanoesList";
import VolcanoDetail from "./pages/VolcanoDetail";
import VolcanoNavbar from "./components/VolcanoNavbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Fourohfour from "./components/Fourohfour";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <div className="App">
        <VolcanoNavbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/volcanoeslist"
              element={<VolcanoesList isAuth={isAuth} />}
            />
            <Route
              path="/volcano"
              element={<VolcanoDetail isAuth={isAuth} />}
            />
            <Route path="/register" element={<Login heading={"Sign Up"} />} />
            <Route
              path="/login"
              element={<Login heading={"Sign In"} setIsAuth={setIsAuth} />}
            />
            <Route path="*" element={<Fourohfour />} />
          </Routes>
        </main>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </BrowserRouter>
  );
}
