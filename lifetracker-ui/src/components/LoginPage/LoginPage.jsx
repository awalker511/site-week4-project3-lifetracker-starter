import React from "react";
import "./LoginPage.css";
import ActivityPage from "../ActivityPage/ActivityPage";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-page">
      <Login />
    </div>
  );
};

export default LoginPage;
