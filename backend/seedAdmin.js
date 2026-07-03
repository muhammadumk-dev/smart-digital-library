const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");

async function seedAdmin() {
  try {
    await connectDB();

    await User.deleteOne({
      email: "admin@mail.com",
    });

    await User.create({
      name: "System Administrator",
      email: "admin@mail.com",
      password: "123456",
      role: "admin",
      department: "Administration",
      level: "Staff",
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error.message);
    process.exit(1);
  }
}

seedAdmin();