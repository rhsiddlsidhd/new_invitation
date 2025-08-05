import mongoose, { Schema, Document } from "mongoose";

interface IUser {
  email: string;
  userId: string;
  password: string;
  role: "user" | "admin";
  isDelete: boolean;
}

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true },
    userId: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
