const express = require("express");
const routes = require("./routes/routes.js");
const { getAppointments } = require("./controllers/appointments");
const database = require("./connection.js");

const app = express();
app.use(express.json());

// app.use("/api", routes);

app.get("/api/appointments", getAppointments);

app.use((req, res, next) => {
  //   console.log("inside error");
  const err = new Error("path not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status || 500).send({
      status: err.status || 500,
      msg: err.message,
    });
  } else {
    next(err);
  }
});

module.exports = app;
