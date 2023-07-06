import "./App.css";
import Login from "../Login/Login";
import { useState } from "react";
import Registration from "../Registration/Registration";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActivityPage from "../ActivityPage/ActivityPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";

function App() {
  //usestates
  const [loggedIn, setLoggedIn] = useState(false);
  // const [appState, setAppState] = useState({
  //   username: "",
  //   password: "",
  //   confirmedPassword: "",
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  // });
  const [errors, setErrors] = useState("");

  return (
    <div className="app">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
