const mongoose = require("mongoose");
require("dotenv").config();
const Appointments = require("./schema/appointments.js");
const Users = require("./schema/users.js");

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
  {
    date: "2022-12-20",
    time: "09:00",
  },
  {
    date: "2022-12-20",
    time: "10:00",
  },
  {
    date: "2022-12-20",
    time: "11:00",
  },
  {
    date: "2022-12-20",
    time: "12:00",
  },
  {
    date: "2022-12-20",
    time: "13:00",
  },
  {
    date: "2022-12-20",
    time: "14:00",
  },
  {
    date: "2022-12-20",
    time: "15:00",
  },
  {
    date: "2022-12-20",
    time: "16:00",
  },
];

const seedUsers = [
  {
    firstName: "Gary",
    lastName: "Shaw",
    email: "gary.shaw@gmx.co.uk",
    username: "gs",
    password: "password",
  },
  {
    firstName: "Nasser",
    lastName: "Benashur",
    email: "nasser@yahoo.com",
    username: "nb",
    password: "password",
  },
  {
    firstName: "Robbie",
    lastName: "McDonough",
    email: "robbie@hotmail.com",
    username: "rm",
    password: "password",
  },
  {
    firstName: "Ryan",
    lastName: "Nolan",
    email: "ryan@msn.com",
    username: "rn",
    password: "password",
  },
];

const seedDB = async () => {
  await Appointments.deleteMany({});
  await Users.deleteMany({});
  await Appointments.insertMany(seedAppointments);
  await Users.insertMany(seedUsers);
};

seedDB().then(() => {
  mongoose.connection.close();
});
