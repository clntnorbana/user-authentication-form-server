import validator from "validator";
import { Request, Response } from "express";
import UserModel from "../models/userModel";

// get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userData._id);

    if (!user) {
      return res.status(404).json({ message: "User do not exists" });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
    });
  } catch (error) {
    error instanceof Error
      ? res.status(401).json({ message: error.message })
      : console.log("Unexpected error", error);
  }
};

// update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userData._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.username = req.body.username || user.username;

      if (req.body.password) {
        if (!validator.isStrongPassword(req.body.password)) {
          return res
            .status(400)
            .json({ message: "Password is not strong enough" });
        }

        user.password = req.body.password;
      }

      // updated user
      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        fullName: updatedUser.fullName,
      });
    }
  } catch (error) {
    error instanceof Error
      ? res.status(400).json({ message: error.message })
      : console.log("Unexpected error", error);
  }
};

// delete user account
export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userData._id);

    await user?.deleteOne();

    res.clearCookie("jwt");

    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    error instanceof Error
      ? res.status(400).json({ message: error.message })
      : console.log("Unexpected error", error);
  }
};
