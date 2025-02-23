import { Request, Response } from "express";
import _ from "lodash";

import { userSchema } from "../schema/userSchemas";
import User from "../models/users";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import createJWT from "../utils/createJWT";

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

const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({ message: "Invalid email address" });
    }

    const validPassword = await comparePassword(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.status(400).json({ message: "Invalid password" });
    } else {
      const token = createJWT({ userId: user._id.toString(), role: user.role });
      res.send(token);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export { register, login };
