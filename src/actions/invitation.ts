"use server";

import { decrypt, getSession } from "@/lib/session";
import { InvitationInput } from "@/models/invitationSchma";
import {
  createInvitation,
  patchInvitation,
} from "@/services/invitationServices";
import { ActionState } from "@/types";
import { writeFile, mkdir } from "fs/promises";
import { redirect } from "next/navigation";

import path from "path";
import z from "zod";
import { id } from "zod/locales";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: Record<string, string[] | undefined> };

const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
const accountRegex = /^[0-9-]{8,30}$/;

function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

const WeddingPartyInfoSchema = z
  .object({
    "groom-name": z
      .string()
      .min(1, "신랑 이름을 입력해주세요.")
      .max(20, "이름은 20자 이하로 입력해주세요."),
    "groom-phone": z
      .string()
      .regex(phoneRegex, "유효한 신랑 전화번호를 입력해주세요."),
    "groom-account": z
      .string()
      .regex(accountRegex, "유효한 신랑 계좌번호를 입력해주세요."),
    "bride-name": z
      .string()
      .min(1, "신부 이름을 입력해주세요.")
      .max(20, "이름은 20자 이하로 입력해주세요."),
    "bride-phone": z
      .string()
      .regex(phoneRegex, "유효한 신부 전화번호를 입력해주세요."),
    "bride-account": z
      .string()
      .regex(accountRegex, "유효한 신부 계좌번호를 입력해주세요."),
  })
  .transform((data) => {
    const camelCaseData: Record<string, string> = {};
    for (const key in data) {
      camelCaseData[toCamelCase(key)] = data[
        key as keyof typeof data
      ] as string;
    }
    return camelCaseData;
  });

const WeddingDateInfoSchema = z
  .object({
    "wedding-date": z.string().min(1, "결혼 날짜를 입력해주세요."),
    "wedding-address": z.string().min(1, "결혼식 주소를 입력해주세요."),
    "wedding-detail-address": z.string().min(1, "상세 주소를 입력해주세요."),
  })
  .transform((data) => {
    const camelCaseData: Record<string, string> = {};
    for (const key in data) {
      camelCaseData[toCamelCase(key)] = data[
        key as keyof typeof data
      ] as string;
    }
    return camelCaseData;
  });

const WeddingParentInfoSchema = z
  .object({
    "groom-father-name": z.string().optional(),
    "groom-father-phone": z.string().optional(),
    "groom-father-account": z.string().optional(),
    "groom-mother-name": z.string().optional(),
    "groom-mother-phone": z.string().optional(),
    "groom-mother-account": z.string().optional(),
    "bride-father-name": z.string().optional(),
    "bride-father-phone": z.string().optional(),
    "bride-father-account": z.string().optional(),
    "bride-mother-name": z.string().optional(),
    "bride-mother-phone": z.string().optional(),
    "bride-mother-account": z.string().optional(),
  })
  .transform((data) => {
    const camelCaseData: Record<string, string> = {};
    for (const key in data) {
      camelCaseData[toCamelCase(key)] = data[
        key as keyof typeof data
      ] as string;
    }
    return camelCaseData;
  });

const FileSchema = z.record(
  z.string(),
  z.array(
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
);

const thumbnailsSchema = z.map(
  z.string(),
  z.array(
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
);

const GalleryMapSchema = z.map(
  z.string(),
  z.object({
    type: z.enum(["A", "B", "C", "D", "E"]),
    files: z.array(
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

const GallerySchema = z.object({
  id: z.string(),
  files: z.array(
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

const validateAndFlatten = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): ValidationResult<T> => {
  const result = schema.safeParse(data);
  return result.success
    ? { success: true as const, data: result.data }
    : {
        success: false as const,
        error: z.flattenError(result.error).fieldErrors,
      };
};

const saveFile = async ({
  buffer,
  filename,
}: {
  buffer: Buffer;
  filename: string;
}) => {
  const dirPath = path.join(process.cwd(), "public/assets");
  await mkdir(dirPath, { recursive: true });
  const filePath = path.join(dirPath, filename);
  await writeFile(filePath, buffer);
  console.log("filePath", filePath);
  return { success: true, path: `/assets/${filename}` };
};

export const createInvitationInfo = async (
  prev: ActionState | null,
  formData: FormData,
) => {
  try {
    const galleryData = new Map();
    const textField: Record<string, string> = {};
    const fileFields: Record<string, File[]> = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (key.startsWith("gallery-")) {
          const id = key.replace("gallery-", "");
          if (!galleryData.has(id))
            galleryData.set(id, { files: [], type: "" });
          galleryData.get(id).files.push(value);
        } else {
          if (!fileFields[key]) fileFields[key] = [];
          fileFields[key].push(value);
        }
      } else {
        const typeMatch = key.match(/^gallery-([a-zA-Z0-9-]+)-type$/);
        if (typeMatch) {
          const id = typeMatch[1];
          if (!galleryData.has(id))
            galleryData.set(id, { files: [], type: "" });
          galleryData.get(id).type = value;
        } else {
          textField[key] = value;
        }
      }
    }

    const galleriesToValidate = Array.from(galleryData.entries()).map(
      ([id, data]) => ({
        id,
        ...data,
      }),
    );

    const partyValidation = validateAndFlatten(
      WeddingPartyInfoSchema,
      textField,
    );

    if (!partyValidation.success) {
      const error = partyValidation.error;
      return {
        success: false,
        error,
      };
    }

    const dateValidation = validateAndFlatten(WeddingDateInfoSchema, textField);

    if (!dateValidation.success) {
      const error = dateValidation.error;
      return {
        success: false,
        error,
      };
    }

    const parentValidation = validateAndFlatten(
      WeddingParentInfoSchema,
      textField,
    );

    if (!parentValidation.success) {
      const error = parentValidation.error;
      return {
        success: false,
        error,
      };
    }

    const fileValidation = validateAndFlatten(FileSchema, fileFields);

    if (!fileValidation.success) {
      const error = fileValidation.error;
      return {
        success: false,
        error,
      };
    }

    const galleryValidation = validateAndFlatten(
      z.array(GallerySchema),
      galleriesToValidate,
    );

    if (!galleryValidation.success) {
      const error = galleryValidation.error;
      return {
        success: false,
        error,
      };
    }

    const thumbnailFiles = fileValidation.data.thumbnail;
    const galleryFiles = galleryValidation.data;

    const thumbnails = await Promise.all(
      thumbnailFiles.map(async (file) => {
        const filename = `${Date.now()}-${file.name.replaceAll(" ", "-")}`;
        const buffer = await file.arrayBuffer();
        const { path } = await saveFile({
          buffer: Buffer.from(buffer),
          filename,
        });
        return path;
      }),
    );

    const galleries = await Promise.all(
      galleryFiles.map(async (g) => {
        const imageUrls = await Promise.all(
          g.files.map(async (f) => {
            const filename = `${Date.now()}-${f.name.replaceAll(" ", "-")}`;
            const buffer = await f.arrayBuffer();
            const { path } = await saveFile({
              buffer: Buffer.from(buffer),
              filename,
            });
            return path;
          }),
        );
        return {
          id: g.id,
          type: g.type,
          images: imageUrls,
        };
      }),
    );

    const savedata = {
      ...partyValidation.data,
      ...dateValidation.data,
      ...parentValidation.data,
      thumbnails: thumbnails,
      galleries: galleries,
    } as InvitationInput;

    await createInvitation({ data: savedata });

    return {
      success: true,
      message: "초대장이 성공적으로 생성되었습니다.",
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    console.error(message);
    redirect("/auth/login");
  }
};

/**
 * input type file
 * 하나당 하나의 이미지 파일이 존재해야함
 * validation
 * size !==0
 * type === startWith('image')
 * !name
 */

export const updateInvitationInfo = async (
  prev: unknown,
  formData: FormData,
) => {
  try {
    const token = await getSession();
    const payload = await decrypt(token);

    // Validate
    const thumbnailField = new Map<string, File[]>();
    const galleryField = new Map<string, { type: string; files: File[] }>();
    const inputField: Record<string, string> = {};
    //input / thumbnail은 정적
    // gallery는 동적
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("gallery-") && value instanceof File) {
        const id = key.replace("gallery-", "");
        const entry = galleryField.get(id) ?? { type: "", files: [] };
        entry.files.push(value);
        galleryField.set(id, entry);
      } else if (key.startsWith("gallery-") && key.endsWith("-type")) {
        const id = key.replace("gallery-", "").replace("-type", "");
        const entry = galleryField.get(id) ?? { type: "", files: [] };
        entry.type = value as string;
        galleryField.set(id, entry);
      } else if (key === "thumbnail" && value instanceof File) {
        const entry = thumbnailField.get(key) ?? [];
        entry.push(value);
        thumbnailField.set(key, entry);
      } else {
        inputField[key] = value as string;
      }
    }

    const keys = Object.keys(inputField);
    const inputValidation = keys.some((k) => ["groom-name"].includes(k))
      ? validateAndFlatten(WeddingPartyInfoSchema, inputField)
      : keys.some((k) => ["wedding-date"].includes(k))
        ? validateAndFlatten(WeddingDateInfoSchema, inputField)
        : validateAndFlatten(WeddingParentInfoSchema, inputField);

    if (!inputValidation.success) {
      return {
        success: false,
        error: inputValidation.error,
      };
    }

    const thumbnailValidation = validateAndFlatten(
      thumbnailsSchema,
      thumbnailField,
    );

    if (!thumbnailValidation.success) {
      return {
        success: false,
        error: thumbnailValidation.error,
      };
    }

    const galleryValidation = validateAndFlatten(
      GalleryMapSchema,
      galleryField,
    );

    if (!galleryValidation.success) {
      return {
        success: false,
        error: galleryValidation.error,
      };
    }

    const thumbnailFiles = thumbnailValidation.data.get("thumbnail") || [];

    const thumbnails = await Promise.all(
      thumbnailFiles.map(async (file) => {
        const filename = `${Date.now()}-${file.name.replaceAll(" ", "-")}`;
        const buffer = await file.arrayBuffer();
        // const buffer = await file.
        const { path } = await saveFile({
          buffer: Buffer.from(buffer),
          filename,
        });
        return path;
      }),
    );

    const galleriesArray = Array.from(galleryValidation.data, ([id, data]) => ({
      id,
      ...data,
    }));

    const galleries = await Promise.all(
      galleriesArray.map(async (g) => {
        const imageUrls = await Promise.all(
          g.files.map(async (f) => {
            const filename = `${Date.now()}-${f.name.replaceAll(" ", "-")}`;
            const buffer = await f.arrayBuffer();
            const { path } = await saveFile({
              buffer: Buffer.from(buffer),
              filename,
            });
            return path;
          }),
        );
        return {
          id: g.id,
          type: g.type,
          images: imageUrls,
        };
      }),
    );

    let saveData: Partial<InvitationInput> = {};

    if (Object.keys(inputValidation.data).length > 0) {
      saveData = { ...inputValidation.data };
    } else if (galleries.length > 0) {
      saveData = { galleries };
    } else if (thumbnails.length > 0) {
      saveData = { thumbnails };
    }

    // Service
    const data = await patchInvitation({
      data: saveData,
      id: payload.userId,
    });

    return {
      success: true,
      data: data,
      message: "프로필 수정이 완료되었습니다.",
    };
  } catch (e) {
    console.error("updateInvitationInfo", e);
  }
};
