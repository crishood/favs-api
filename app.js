const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/users");
const listRouter = require("./routes/lists");
const favRouter = require("./routes/favs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/lists", listRouter);
app.use("/favs", favRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello ma G");
});

module.exports = app;
