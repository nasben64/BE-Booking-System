const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  time: {
    required: true,
    type: String,
  },
  username: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("Appointments", appointmentSchema);
