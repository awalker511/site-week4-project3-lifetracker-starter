const { Pool } = require("pg");

//create table
const sqlScript = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (POSITION ('@' IN email) > 1),
    password VARCHAR(255) NOT NULL)`;

const pool = new Pool({
  user: "lifetracker_db_6p29_user",
  password: "lceEZDCh6wlfdteat0TM5OHoB4ej1a1P",
  host: "dpg-cikd835ph6eg6kaqm57g-a",
  port: 5432,
  database: "lifetracker_db_6p29",
});

//Execute the SQL script
pool
  .query(sqlScript)
  .then(() => {
    // console.log("Table created successfully");
  })
  .catch((error) => {
    console.error("Error creating table", error);
  });

module.exports = pool;
