import React from "react";
import "./Navbar.css";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import LoginPage from "../LoginPage/LoginPage";
//import { Link } from "react-router-dom";

import {
  BrowserRouter,
  Link,
  Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
const Navbar = ({ loggedIn, setLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location("/");
    setLoggedIn(false);
  };
  // const handleLogin = () => {
  //   return <Link path="/login" element={<LoginPage />} />;
  // };

  // const handleRegistration = () => {
  //   return <Link path="/register" element={<RegistrationPage />} />;
  // };
  return (
    <div className="navbar">
      <ul className="navbar-options">
        <li>
          <a href="/">
            <img src="https://codepath-student-store-demo.surge.sh/assets/codepath.f1b3e41a.svg"></img>
          </a>
        </li>
        <li>
          <a className="option" href="/activity">
            Activity
          </a>
        </li>
        <li>
          <a className="option" href="/exercise">
            Exercise
          </a>
        </li>
        <li>
          <a className="option" href="/nutrition">
            Nutrition
          </a>
        </li>
        <li>
          <a className="option" href="/sleep">
            Sleep
          </a>
        </li>
      </ul>
      {loggedIn ? (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div className="navbar-buttons">
          <a href="/login">
            <button className="login-button">Login</button>
          </a>

          <a href="/register">
            <button className="register-button">SignUp</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
