const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
require("dotenv").config();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("database connected...");
});

const app = express();
app.use(express.json());

app.use("/api", routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
