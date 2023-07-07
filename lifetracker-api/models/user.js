"use strict";

const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/errors");
const pool = require("../db/pool");
const bcrypt = require("bcrypt");
const { createUserJwt } = require("../utils/tokens");
// const { validateFields } = require("../utils/validate");

const { BCRYPT_WORK_FACTOR } = require("../config");
const { response } = require("express");

class User {
  static createPublicUser(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      password: user.password,
      token: user.token,
    };
  }

  static async authentication(credentials) {
    const { email, password } = credentials;
    const requiredCreds = ["username", "password"];
    try {
      validateFields({
        required: requiredCreds,
        obj: credentials,
        location: "user authentication",
      });
    } catch (err) {
      throw err;
    }
  }
  //const user= await User.fetchUserByEmail(credentials.email)

  static async login(credentials) {
    const requiredFields = ["email", "password"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    const user = await User.fetchUserByEmail(credentials.email);
    console.log(user);
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new UnauthorizedError({ message: "Invalid Password" });
      } else {
        let token = createUserJwt(user);
        user.token = token;
        return User.createPublicUser(user), { token };
      }
    } else if (!user) {
      throw new NotFoundError("User not found");
    }

    //Generate and sign JWT token, store secret-key in .env
    const token = jwt.sign({ userId: user.id }, "secret-key-unique", {
      expiresIn: "1h",
    });
  }

  //register USER function
  static async register(credentials) {
    const requiredFields = [
      "username",
      "password",
      "first_name",
      "last_name",
      "email",
    ];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }
    const lowerCasedEmail = credentials.email.toLowerCase();
    //salting password
    const saltRounds = 13;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPw = await bcrypt.hash(credentials.password, salt);

    const result = await pool.query(
      `INSERT INTO users (
            username, password, first_name, last_name, email
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING username, password, first_name, last_name, email, created_at`,
      [
        credentials.username,
        hashedPw,
        credentials.first_name,
        credentials.last_name,
        lowerCasedEmail,
      ]
    );
    const user = result.rows[0];
    return user;
  }
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email found");
    }
    const query = `SELECT * FROM users WHERE email= $1`;
    const result = await pool.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}
module.exports = User;
