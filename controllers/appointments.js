const Appointments = require("../models/appointments");

exports.getAppointments = async (req, res, next) => {
  const { days } = req.query;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  console.log(tomorrow);

  try {
    // const appointments = await Appointments.find();
    const appointments = await Appointments.aggregate([
      { $match: { date: { $gte: today } } },
      { $match: { username: { $exists: false } } },
      { $group: { _id: "$date", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).send({ appointments });
  } catch (error) {
    next(error);
  }
};

// db.appointments.aggregate([{$match: {username:{$exists:false }} },{$group: {_id: "$date", count:{$sum:1}}}])
