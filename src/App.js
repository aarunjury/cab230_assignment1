import "bootstrap/dist/css/bootstrap.min.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VolcanoesList from "./pages/VolcanoesList";
import VolcanoDetail from "./pages/VolcanoDetail";
import VolcanoNavbar from "./components/VolcanoNavbar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { AuthContext } from "./components/contexts/AuthContext";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);
  console.log("isAuth is currently set to:" + isAuth);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <div className="App">
          <VolcanoNavbar isAuth={isAuth} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/volcanoeslist" element={<VolcanoesList />} />
              <Route path="/volcano" element={<VolcanoDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
              <Route
                path="/logout"
                element={<Logout setIsAuth={setIsAuth} />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
