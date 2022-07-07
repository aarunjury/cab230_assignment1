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
import { createBrowserHistory } from "history";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const token = localStorage.getItem("token");
  const history = createBrowserHistory();
  //const parsedToken = parseToken(token);
  
  // console.log("Is logged in:"+isLoggedIn)
  // // function to parse the JWT token for expiry time
  // function parseToken(jwtoken) {
  //   if (jwtoken) {
  //     try {
  //       return JSON.parse(jwtoken.split(".")[1]);
  //     } catch (error) {
  //       // ignore
  //     }
  //   }
  //   return null;
  // }

  // Will fire on all page loads to continuously check if the token
  // has expired and if so, redirect to login
  // useEffect(() => {
  //   if (token) {
  //     if (parsedToken.exp * 1000 < Date.now()) {
  //       setIsLoggedIn(false);
  //       localStorage.removeItem("token", null);
  //       history.push("/login");
  //     } else {
  //       setIsLoggedIn(true)
  //     }
  //   }
  // }, [history, parsedToken, token]);

  // BrowserRouter and all page routes plus navbar and footer
  return (
    <BrowserRouter history={history}>
      <div className="App">
        <VolcanoNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/volcanoeslist" element={<VolcanoesList />} />
            <Route
              path="/volcano"
              element={<VolcanoDetail isLoggedIn={isLoggedIn} />}
            />
            <Route path="/register" element={<Login heading={"Sign Up"} />} />
            <Route
              path="/login"
              element={
                <Login heading={"Sign In"} setIsLoggedIn={setIsLoggedIn} />
              }
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
