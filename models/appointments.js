// const database = require("../schema/connection.js");
const Appointments = require("../schema/appointments");

exports.selectAppointments = async (req, res) => {
  const data = await Appointments.find();
  res.json(data);
};
