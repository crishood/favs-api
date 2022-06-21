const express = require("express");
const { connect } = require("./db");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/users");
const listRouter = require("./routes/lists");
const favRouter = require("./routes/favs");
require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 8080;

const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/lists", listRouter);
app.use("/favs", favRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello ma G");
});

app.listen(port, () => {
  console.log("It's alive!");
});
