import { Request, Response } from "express";
import { userSchema } from "../schema/userSchemas";
import User from "../models/users";
import _ from "lodash";
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
    const user = await User.create(
      _.pick(userData, [
        "firstName",
        "lastName",
        "email",
        "password",
        "location",
        "role",
      ])
    );
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Internal server Error!" });
  }
};

export { register };
