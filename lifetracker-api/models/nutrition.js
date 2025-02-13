const db = require("../db/pool");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Nutrition {
  // function that fetches all nutrition based on user's email
  static async fetch(email) {
    const result = await db.query(
      `SELECT id, name, category, quantity, calories, image_url 
            FROM nutrition 
            WHERE user_email=$1
            ORDER BY id DESC`,
      [email]
    );

    return result.rows;
  }

  // function that fetches by Id one nutrition item
  static async fetchById(id) {
    console.log(id);
    const parsedId = Number.parseInt(id);
    // check for invalid param
    if (typeof parsedId !== "number" || typeof parsedId === NaN)
      throw new BadRequestError("Parameter is not a valid ID");

    const result = await db.query(
      `SELECT id, name, category, quantity, calories, image_url, user_email AS "userEmail" 
    FROM nutrition 
    WHERE id=$1`,
      [id]
    );

    if (result?.rows) {
      return result.rows[0];
    } else {
      throw new NotFoundError("No nutrition items found with provided ID");
    }
  }

  // function that creates new nutritions
  static async create(email, data) {
    console.log("create", data);
    // check that all field keys and values exist
    const requiredFields = ["foodname", "category", "quantity", "calories"];
    const stringFields = ["foodname", "category"];
    requiredFields.forEach((field) => {
      if (!data.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field}!`);
      }
    });

    stringFields.forEach((field) => {
      if (data[field].length <= 0) {
        throw new BadRequestError(`Missing ${field}`);
      }
    });

    // field error handling
    if (data.quantity <= 0) {
      throw new BadRequestError(`Quantity can't be 0`);
    }

    if (data.calories <= 0) {
      throw new BadRequestError(`Calories can't be 0`);
    }

    // perform query if all fields are valid
    const result = await db.query(
      `INSERT INTO nutrition (
                name,
                category,
                quantity,
                calories,
                image_url,
                user_email,
                user_id
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id, name, category, quantity, calories, image_url, user_email, user_id ;`,
      [
        data.foodname,
        data.category,
        Number(data.quantity),
        Number(data.calories),
        data.image,
        email,
        data.user_id,
      ]
    );

    return result.rows[0];
  }
}

module.exports = Nutrition;
