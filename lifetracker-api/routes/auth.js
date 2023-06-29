const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

//route for registering
router.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;

  //password
  try {
    const saltRounds = 5;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPw = await bcrypt.hash(password, salt);

    const creatUserQuery = `INSERT INTO users (name, username, email, passwword) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`;

    const values = [name, username, email, hashedPw];
    const result = await pool.query(creatUserQuery, values);

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

//route for login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const getUserQuery = `SELECT * FROM users WHERE username= $1`;
    const result = await pool.query(getUserQuery, [username]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //Generate and sign JWT token, store secret-key in .env
    const token = jwt.sign({ userId: user.id }, "secret-key-unique", {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ message: "Error Logging in" });
  }
});
module.exports = router;
