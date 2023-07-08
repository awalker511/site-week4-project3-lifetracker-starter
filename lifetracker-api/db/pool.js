const { Pool } = require("pg");

//create table
const sqlScript = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (POSITION ('@' IN email) > 1),
    password VARCHAR(255) NOT NULL)`;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "lifetracker",
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
