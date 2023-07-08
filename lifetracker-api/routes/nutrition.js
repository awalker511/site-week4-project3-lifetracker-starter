const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Nutrition = require("../models/nutrition");
const pool = require("../db/pool");
const { validateToken } = require("../utils/tokens");

//add new food item to the nutrition data table
// router.post("/", async (req, res) => {
//   try {
//     const { name, category, quantity, calories, image_url } = req.body;
//     const query = `INSERT INTO nutrition (name, category, quantity, calories, image_url) VALUES ($1, $2, $3, $4) RETURNING *`;
//     const values = [name, category, quantity, calories, image_url];

//     const result = await pool.query(query, values);
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
router.post("/create", async (req, res, next) => {
  try {
    // get user email to save reference in psql table

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token);
    res.locals.user = decodedToken;

    console.log("RES.LOCALS.USER", res.locals.user);

    const { email } = res.locals.user;

    const user = await User.fetchUserByEmail(email);
    console.log(user.email);
    // retrieve new nutrition item data
    const nutritionData = req.body;

    // create entry
    await Nutrition.create(user.email, nutritionData);
    console.log("created nutrition");
    // fetch again all the nutritions associated with email so the user can be
    // redirected in the frontend with the new information
    const nutritions = await Nutrition.fetch(email);
    console.log("got nutritions");
    // send new table with nutritions
    return res.status(201).json({
      nutritions,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { email } = res.locals.user;
    const nutritions = await Nutrition.fetch(email);
    return res.status(200).json({ nutritions });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
