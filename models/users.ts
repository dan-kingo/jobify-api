import mongoose from "mongoose";

const userSchemas = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  location: String,
  role: {
    type: String,
    enum: ["user", "admin"],
  },
});

const User = mongoose.model("User", userSchemas);

export default User;
