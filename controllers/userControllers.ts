import { Request, Response } from "express";
import _ from "lodash";

import { userSchema } from "../schema/userSchemas";
import User from "../models/users";
import hashPassword from "../utils/hashPassword";
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
    const hashPwd = await hashPassword(req.body.password);

    userData.password = hashPwd;
    await User.create(userData);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server Error!" });
  }
};

export { register };
