const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes.js");
const {
  getAppointments,
  getAppointmentsByDate,
  patchAppointment,
  getAppointmentsByusername,
} = require("./controllers/appointments");
const database = require("./connection.js");
const {
  getUsers,
  createUser,
  validateUser,
} = require("./controllers/users.js");
const { stripePayment } = require("./controllers/stripe.js");

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/api", routes);

app.get("/api/appointments", getAppointments);
app.get("/api/users", getUsers);
app.post("/api/users", createUser);
app.post("/api/users/:username", validateUser);
app.get("/api/appointments/:date", getAppointmentsByDate);
app.patch("/api/appointments/:appointment_id", patchAppointment);
app.post("/api/payment", stripePayment);
app.get("/api/bookedAppointments/:username", getAppointmentsByusername);

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

app.use((err, req, res, next) => {
  //console.log(err, "error coming from app.use");
  // check for the server error code '22P02'
  if (err.message) {
    res.status(400).send({ msg: err.message });
  } else {
    res.sendStatus(500);
  }
});

module.exports = app;
