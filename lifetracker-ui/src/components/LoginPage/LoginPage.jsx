import React from "react";
import "./LoginPage.css";
import ActivityPage from "../ActivityPage/ActivityPage";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";

const LoginPage = ({ setAppState }) => {
  return (
    <div className="login-page">
      <Login setAppState={setAppState} />
    </div>
  );
};

export default LoginPage;
