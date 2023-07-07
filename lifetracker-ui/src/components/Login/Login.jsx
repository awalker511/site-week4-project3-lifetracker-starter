import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAppState }) => {
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  //onchange for login
  const onLoginChange = (e) => {
    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setLoginForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        loginForm
      );
      if (res?.data) {
        setAppState(res.data);
        setIsLoading(false);
        navigate("/activity");
        localStorage.setItem("token", res.data.token);
      } else {
        setErrors((e) => ({
          ...e,
          LoginForm: "Invalid username/password combination",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        loginForm: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };
  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {Boolean(errors.loginForm) && (
        <p className="error-message">{errors.loginForm}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={loginForm.email}
          onChange={onLoginChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={onLoginChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="footer">
        <p>
          Don't have an account? Sign up <a href="/register">here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
