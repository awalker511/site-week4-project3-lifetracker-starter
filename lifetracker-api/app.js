const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { NotFoundError } = require("./utils/errors");
const app = express();

const nutritionRoutes = require("./routes/nutrition");
const authRoutes = require("./routes/auth");

//middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//routes
app.use("/auth", authRoutes);
app.use("/nutrition", nutritionRoutes);

app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});
/** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//   return next(new NotFoundError());
// });

module.exports = app;
