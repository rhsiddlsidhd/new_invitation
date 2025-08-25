import z from "zod";

const cloudinaryUploadResponseSchema = z.object({
  asset_id: z.string(),
  public_id: z.string(),
  version: z.number(),
  signature: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  resource_type: z.string(),
  created_at: z.string(),
  bytes: z.number(),
  type: z.string(),
  url: z.string(),
  secure_url: z.string(),
  folder: z.string().optional(),
  original_filename: z.string(),
});

export const gallerySchema = z.map(
  z.string(),
  z.object({
    type: z.enum(["A", "B", "C", "D", "E"]),
    images: z.array(cloudinaryUploadResponseSchema),
  }),
);
