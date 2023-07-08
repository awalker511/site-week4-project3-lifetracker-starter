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
import NutritionForm from "../NutritionForm/NutritionForm";

function App() {
  //usestates
  const [userName, setUserName] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [appState, setAppState] = useState({
    user: "",
    nutrition: [],
  });
  const [errors, setErrors] = useState("");

  //logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setLoggedIn(false);
  // };
  //token authentication

  const [id, setId] = useState(null);
  const [nutritionData, setNutritionData] = useState("");
  useEffect(() => {
    const checkLoggedIn = () => {
      //check is user is logged in when user first accesses webpage
      const token = localStorage.getItem("token");
      if (token) {
        //decodes the stored token
        const decodedToken = jwtDecode(token);
        setAppState({ ...appState, user: decodedToken.email });
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

  return (
    <div className="app">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route
            path="/login"
            element={<LoginPage setAppState={setAppState} />}
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/nutrition"
            element={
              <NutritionPage appState={appState} setAppState={setAppState} />
            }
          />
          <Route path="/nutrition/create" element={<NutritionForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
