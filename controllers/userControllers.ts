import { Request, Response } from "express";
import _ from "lodash";
import bcrypt from "bcryptjs";

import { userSchema } from "../schema/userSchemas";
import User from "../models/users";
const register = async (req: Request<userSchema>, res: Response) => {
  try {
    const isFirstAccount = (await User.countDocuments()) === 0;
    const userData: userSchema = {
      ...req.body,
      role: isFirstAccount ? "admin" : "user",
    };

    let registeredUser = await User.findOne({ email: req.body.email });
    if (registeredUser) {
      res.status(400).json({ message: "User already registered!" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    userData.password = hashPassword;
    await User.create(userData);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server Error!" });
  }
};

export { register };
