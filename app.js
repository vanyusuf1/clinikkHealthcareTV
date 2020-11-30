const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOCONNECTURL } = require("./keys");
const port = 8000;

mongoose.connect(MONGOCONNECTURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo db");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

require("./models/user");
require("./models/content");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/content"));

app.listen(port, () => {
  console.log("server is running on", port);
});
module.exports = app;
