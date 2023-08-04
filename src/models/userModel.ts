import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  fullName: string;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
