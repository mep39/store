import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.create({
  email: "admin@store.com",
  password: "admin123",
  role: "admin"
});

console.log("Admin created");
process.exit();
