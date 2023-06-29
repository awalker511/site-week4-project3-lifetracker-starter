const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`server running on localhost:${PORT}`);
});
