import "./App.css";
import Login from "../Login/Login";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Registration from "../Registration/Registration";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActivityPage from "../ActivityPage/ActivityPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import NutritionPage from "../NutritionPage/NutritionPage";

function App() {
  //logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };
  //token authentication
  useEffect(() => {
    const checkLoggedIn = () => {
      //check is user is logged in when user first accesses webpage
      const token = localStorage.getItem("token");
      if (token) {
        //decodes the stored token
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);
        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true);
        } else {
          //token has expired, log out the user
          handleLogout();
        }
      }
    };
    checkLoggedIn();
  }, []);
  //usestates
  const [userName, setUserName] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [appState, setAppState] = useState({
    user: "",
    nutrition: "",
    sleep: "",
    exercise: "",
  });
  const [errors, setErrors] = useState("");

  return (
    <div className="app">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route
            path="/login"
            element={<LoginPage setAppState={setAppState} />}
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
