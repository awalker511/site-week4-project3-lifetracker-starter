import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ loggedIn, setLoggedIn, appState }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    // navigate("/");
    setLoggedIn(false);
  };
  // const navigate = useNavigate();
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
      {localStorage.getItem("token") ? (
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
