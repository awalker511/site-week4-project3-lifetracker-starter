const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const pool = require("../db/pool");

//route for registering
router.post("/register", async (req, res) => {
  const { username, password, first_name, last_name, email } = req.body;
  //password
  try {
    const user = await User.register(req.body);
    return res.status(201).json({
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

//route for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(req.body);
    //Generate and sign JWT token, store secret-key in .env
    const token = jwt.sign({ userId: user.id }, "secret-key-unique", {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: {
        id: user.id,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ message: "Error Logging in" });
  }
});
module.exports = router;
