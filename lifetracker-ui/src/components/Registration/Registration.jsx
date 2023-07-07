import React from "react";
import "./Registration.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = ({}) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [regForm, setRegForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  //handlesubmit function for registration form
  const handleOnSubmit = async () => {
    //setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }));

    if (regForm.confirmedPassword !== regForm.password) {
      setErrors((e) => ({
        ...e,
        confirmedPassword: "Passwords do not match.",
      }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, confirmedPassword: null }));
    }

    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        username: regForm.username,
        firstname: regForm.firstname,
        lastname: regForm.lastname,
        email: regForm.email,
        password: regForm.password,
        confirmedPassword: regForm.confirmedPassword,
      });

      if (res?.data?.user) {
        setAppState(res.data);
        setIsLoading(false);
        navigate("/activity");
      } else {
        setErrors((e) => ({
          ...e,
          regForm: "Something went wrong with registration",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        regForm: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  //onchange function for getting user input into registration form
  const onRegFormChange = (event) => {
    if (event.target.name === "password") {
      if (
        regForm.confirmedPassword &&
        regForm.confirmedPassword !== event.target.value
      ) {
        setErrors((e) => ({
          ...e,
          confirmedPassword: "Passwords do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, confirmedPassword: null }));
      }
    }
    if (event.target.name === "confirmedPassword") {
      if (regForm.password && regForm.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          confirmedPassword: "Passwords do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, confirmedPassword: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setRegForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  // const registerUser = async (event) => {
  //   event.preventDefault();
  //   if (
  //     regForm.username == "" ||
  //     regForm.password == "" ||
  //     regForm.confirmedPassword == "" ||
  //     regForm.firstname == "" ||
  //     regForm.lastname == "" ||
  //     regForm.email == ""
  //   ) {
  //     setErrors("Missing Fields");
  //   }
  //   try {
  //     const response = await fetch("http://localhost:3001/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //         confirmedPassword,
  //         firstname,
  //         lastname,
  //         email,
  //       }),
  //     });

  //     //wait for the response
  //     const data = await response.json();

  //     if (response.ok) {
  //       //Registration successful
  //       setLoggedIn(true);
  //       console.log(data.message); //optional - display a success message
  //     } else {
  //       //Registration failed
  //       console.log(data.message); //optional - display error meesage
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  // };

  return (
    <div className="register">
      <h1>Create an Account</h1>
      <form className="register-form" onSubmit={handleOnSubmit}>
        <input
          type="email"
          name="email"
          value={regForm.email}
          placeholder="Email"
          onChange={onRegFormChange}
          required
        />
        <br></br>

        <input
          type="text"
          name="username"
          value={regForm.username}
          placeholder="Username"
          onChange={onRegFormChange}
          required
        />
        <br></br>
        <div className="name-input">
          <input
            type="text"
            name="firstname"
            value={regForm.firstname}
            placeholder="First name"
            onChange={onRegFormChange}
            required
          />
          <input
            type="text"
            name="lastname"
            value={regForm.lastname}
            placeholder="Last name"
            onChange={onRegFormChange}
            required
          />
        </div>
        <br></br>

        <input
          type="password"
          name="password"
          value={regForm.password}
          placeholder="Password"
          onChange={onRegFormChange}
          required
        />
        <br></br>
        <input
          type="password"
          name="confirmedPassword"
          value={regForm.confirmedPassword}
          placeholder="Confirm password"
          onChange={onRegFormChange}
          required
        />
        <br></br>
        <button className="submit-button" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
};
export default Registration;
