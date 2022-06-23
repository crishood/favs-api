const mongoose = require("mongoose");

let connection;

async function connect() {
  if (connection) return;

  const url = process.env.NOTHING_HERE;
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  connection = mongoose.connection;

  connection.once("open", () => console.log("Mongo is alive!"));
  connection.on("disconnected", () => console.log("Disconnected"));
  connection.on("error", (err) => console.log("Something went wrong", err));

  await mongoose.connect(url, opts);
}

async function disconnected() {
  if (!connection) return;

  await mongoose.disconnect();
}

async function cleanup() {
  for (const collection in connection.collections) {
    await connection.collections[collection].deleteMany({});
  }
}

module.exports = { connect, disconnected, cleanup };
