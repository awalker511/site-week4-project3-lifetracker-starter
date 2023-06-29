import React from "react";
import "./Registration.css";
import { useState } from "react";

const Registration = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, username, firstname, lastname, password);
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />

        <label>Username</label>
        <input
          type="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />

        <label>First name</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          required
        />

        <label>Last name</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
