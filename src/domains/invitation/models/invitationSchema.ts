import mongoose, { Schema } from "mongoose";

export interface IGallery {
  id: string;
  type: "A" | "B" | "C" | "D" | "E";
  images: string[];
}

export interface InvitationDocument {
  userId: string;
  groomName: string;
  groomPhone: string;
  groomAccount: string;
  brideName: string;
  bridePhone: string;
  brideAccount: string;
  weddingDate: string;
  weddingAddress: string;
  weddingDetailAddress: string;
  groomFatherName: string;
  groomFatherPhone: string;
  groomFatherAccount: string;
  groomMotherName: string;
  groomMotherPhone: string;
  groomMotherAccount: string;
  brideFatherName: string;
  brideFatherPhone: string;
  brideFatherAccount: string;
  brideMotherName: string;
  brideMotherPhone: string;
  brideMotherAccount: string;
  thumbnails: string[];
  galleries: IGallery[];
}

export type InvitationInput = Omit<
  InvitationDocument,
  "createdAt" | "updatedAt"
>;

const gallerySchema = new Schema<IGallery>({
  id: { type: String },
  type: { type: String, enum: ["A", "B", "C", "D", "E"], required: true },
  images: { type: [String] },
});

const invitationSchema = new Schema<InvitationDocument>({
  userId: { type: String, required: true },
  groomName: { type: String, required: true },
  groomPhone: { type: String, required: true },
  groomAccount: { type: String, required: true },
  brideName: { type: String, required: true },
  bridePhone: { type: String, required: true },
  brideAccount: { type: String, required: true },
  weddingDate: { type: String, required: true },
  weddingAddress: { type: String, required: true },
  weddingDetailAddress: { type: String, required: true },
  groomFatherName: { type: String },
  groomFatherPhone: { type: String },
  groomFatherAccount: { type: String },
  groomMotherName: { type: String },
  groomMotherPhone: { type: String },
  groomMotherAccount: { type: String },
  brideFatherName: { type: String },
  brideFatherPhone: { type: String },
  brideFatherAccount: { type: String },
  brideMotherName: { type: String },
  brideMotherPhone: { type: String },
  brideMotherAccount: { type: String },
  thumbnails: { type: [String], required: true },
  galleries: { type: [gallerySchema] },
});

const Invitation =
  (mongoose.models.Invitation as mongoose.Model<InvitationDocument>) ||
  mongoose.model<InvitationDocument>("Invitation", invitationSchema);

export default Invitation;
