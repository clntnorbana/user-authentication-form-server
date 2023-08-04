import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/userModel";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.userData = await UserModel.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    error instanceof Error
      ? res.status(401).json({ message: error.message })
      : console.log("Unexpected error", error);
  }
};

export { requireAuth };
