import z from "zod";

export const GalleryMapSchema = z.map(
  z.string(),
  z.object({
    type: z.enum(["A", "B", "C", "D", "E"]),
    images: z.array(
      z
        .instanceof(File)
        .refine(
          (file) => file && file instanceof File && file.size > 0,
          "이미지를 등록해주세요",
        )
        .refine(
          (file) =>
            ["image/png", "image/jpeg", "image/webp"].includes(file.type),
          "지원하지 않는 이미지 형식입니다.",
        ),
    ),
  }),
);

export const GallerySchema = z.object({
  id: z.string(),
  images: z.array(
    z
      .instanceof(File)
      .refine(
        (file) => file && file instanceof File && file.size > 0,
        "이미지를 등록해주세요",
      )
      .refine(
        (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
        "지원하지 않는 이미지 형식입니다.",
      ),
  ),
  type: z.enum(["A", "B", "C", "D", "E"]),
});

export const ThumbnailSchema = z.array(
  z
    .instanceof(File)
    .refine(
      (file) => file && file instanceof File && file.size > 0,
      "이미지를 등록해주세요",
    )
    .refine(
      (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      "지원하지 않는 이미지 형식입니다.",
    ),
);
