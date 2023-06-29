import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-options">
        <a href="/activity">Actvity</a>
        <a href="/exercise">Exercise</a>
        <a href="/nutrition">Nutrition</a>
        <a href="/sleep">Sleep</a>
      </div>
      //conditionally render based on login status
      {/* <div className="navbar-buttons">
        <a href="/login">
          <button className="login-button">Sign In</button>
        </a>

        <a href="/register">
          <button className="register-button">Register</button>
        </a>
      </div> */}
    </div>
  );
};

export default Navbar;
