const mongoose = require("mongoose");
require("dotenv").config();
const Appointments = require("./models/appointments.js");

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("database connected...");
});

const seedAppointments = [
  {
    date: "2022-12-19",
    time: "09:00",
  },
  {
    date: "2022-12-19",
    time: "10:00",
  },
  {
    date: "2022-12-19",
    time: "11:00",
  },
  {
    date: "2022-12-19",
    time: "12:00",
  },
  {
    date: "2022-12-19",
    time: "13:00",
  },
  {
    date: "2022-12-19",
    time: "14:00",
  },
  {
    date: "2022-12-19",
    time: "15:00",
  },
  {
    date: "2022-12-19",
    time: "16:00",
  },
];

const seedDB = async () => {
  await Appointments.deleteMany({});
  await Appointments.insertMany(seedAppointments);
};

seedDB().then(() => {
  mongoose.connection.close();
});
