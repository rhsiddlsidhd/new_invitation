import mongoose, { Schema, Document, Model } from "mongoose";

export interface Feature extends Document {
  // code: TemplateFilterState["premiumFeat"][number]; // 고유 코드 ("VIDEO", "CUSTOM_FONT")
  code: string;
  label: string; // 관리자/프론트용 이름
  description?: string; // 기능 설명
  additionalPrice: number; // 추가 요금
  isActive: boolean; // 활성화 여부
  createdAt: Date;
  updatedAt: Date;
}

const featureSchema = new Schema<Feature>(
  {
    code: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    description: String,
    additionalPrice: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const FeatureModel: Model<Feature> =
  mongoose.models.Feature || mongoose.model<Feature>("Feature", featureSchema);
