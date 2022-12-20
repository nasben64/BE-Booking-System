const express = require("express");
const routes = require("./routes/routes.js");
const { getAppointments } = require("./controllers/appointments");
const database = require("./connection.js");

const app = express();
app.use(express.json());

// app.use("/api", routes);

app.get("/api/appointments", getAppointments);

module.exports = app;
