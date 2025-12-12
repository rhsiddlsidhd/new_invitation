import mongoose, { Schema, Document, Model } from "mongoose";

export interface SignUpUser {
  email: string;
  name: string;
  phone: string;
  password: string;
}

interface UserModel extends SignUpUser {
  role: "user" | "admin";
  isDelete: boolean;
}

export interface UserDocument extends UserModel, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
