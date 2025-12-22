import { GuestBook as GuestBookType } from "@/shared/types";
import mongoose, { Document, Model, Schema } from "mongoose";

interface GuestBookDocument extends GuestBookType, Document {
  userId: string;
}

const guestBookSchema = new Schema<GuestBookDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

const GuestBook: Model<GuestBookDocument> =
  mongoose.models.GuestBook ||
  mongoose.model<GuestBookDocument>("GuestBook", guestBookSchema);

export default GuestBook;
