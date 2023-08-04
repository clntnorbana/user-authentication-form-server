import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import validator from "validator";
import generateToken from "../utils/generateToken";

// register user
export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password } = req.body;

    if (!fullName || !username || !password) {
      return res.status(400).json({ message: "Field is required" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }

    const userExists = await UserModel.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // create user account
    const createdUser = await UserModel.create({
      fullName,
      username,
      password,
    });

    res.status(200).json({
      _id: createdUser._id,
      fullName: createdUser.fullName,
      username: createdUser.username,
    });
  } catch (error) {
    error instanceof Error
      ? res.status(400).json({ message: error.message })
      : console.log("Unexpected error", error);
  }
};

// login user
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Field is required" });
    }

    const user = await UserModel.findOne({ username });

    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // authentication passed? generate token
    // here
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
    });
  } catch (error) {
    error instanceof Error
      ? res.status(400).json({ message: error.message })
      : console.log("Unexpected error", error);
  }
};

// logout user
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "logged out" });
  } catch (error) {
    error instanceof Error
      ? res.status(400).json({ message: error.message })
      : console.log("Unexpected error", error);
  }
};
