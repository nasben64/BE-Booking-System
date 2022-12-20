const Appointments = require("../models/appointments");

exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointments.find();
    res.status(200).send({ appointments });
  } catch (error) {
    next(error);
  }
};
