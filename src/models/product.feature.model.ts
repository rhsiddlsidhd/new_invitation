import { TemplateFilterState } from "@/context/templateFilter/type";
import { Schema, model, Document } from "mongoose";

export interface Feature extends Document {
  code: TemplateFilterState["premiumFeat"][number]; // 고유 코드 ("VIDEO", "CUSTOM_FONT")
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

export const FeatureModel = model<Feature>("Feature", featureSchema);
