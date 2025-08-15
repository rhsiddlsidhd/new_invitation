"use server";

import { InvitationInput } from "@/models/invitationSchma";
import { createInvitation } from "@/services/invitationServices";
import { ActionState } from "@/types";
import { writeFile, mkdir } from "fs/promises";
import { redirect } from "next/navigation";

import path from "path";
import z from "zod";

function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function validateAndFlatten<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  return result.success
    ? { success: true as const, data: result.data }
    : {
        success: false as const,
        error: z.flattenError(result.error).fieldErrors,
      };
}

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
  return { success: true, path: `/assets/${filename}` };
};

export const createInvitationInfo = async (
  prev: ActionState | null,
  formData: FormData,
) => {
  try {
    const textField: Record<string, string | File> = {};
    const fileFields: Record<string, File[]> = {};
    const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
    const accountRegex = /^[0-9-]{8,30}$/;

    for (const [key, value] of formData.entries()) {
      if (
        (key.startsWith("gallery-") || key.startsWith("thumbnail")) &&
        value instanceof File
      ) {
        if (!fileFields[key]) fileFields[key] = [];
        fileFields[key].push(value);
      } else {
        textField[key] = value;
      }
    }

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
            (file) =>
              ["image/png", "image/jpeg", "image/webp"].includes(file.type),
            "지원하지 않는 이미지 형식입니다.",
          ),
      ),
    );

    const TextSchema = z.object({
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
      "wedding-date": z.string().min(1, "결혼 날짜를 입력해주세요."),
      "wedding-address": z.string().min(1, "결혼식 주소를 입력해주세요."),
      "wedding-detail-address": z.string().min(1, "상세 주소를 입력해주세요."),
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
    });

    const textValidation = validateAndFlatten(TextSchema, textField);
    const fileValidation = validateAndFlatten(FileSchema, fileFields);

    if (!fileValidation.success || !textValidation.success) {
      return {
        success: false,
        error: { ...fileValidation.error, ...textValidation.error },
      };
    }

    const camelTextData: Record<string, string> = {};
    const galleries: { id: string; images: string[] }[] = [];
    const thumbnails: string[] = [];

    for (const key in textValidation.data) {
      const value =
        textValidation.data[key as keyof typeof textValidation.data];
      camelTextData[toCamelCase(key)] = value ?? "";
    }

    for (const k in fileValidation.data) {
      const images: string[] = [];
      for (const file of fileValidation.data[k]) {
        const filename = `${Date.now()}-${file.name.replaceAll(" ", "-")}`;
        const buffer = await file.arrayBuffer();
        const r = await saveFile({ buffer: Buffer.from(buffer), filename });
        images.push(r.path);
      }
      if (k.startsWith("gallery-")) {
        galleries.push({
          id: k.replace("gallery-", ""),
          images,
        });
      } else if (k === "thumbnail") {
        thumbnails.push(...images);
      }
    }

    const savedata = {
      ...camelTextData,
      thumbnails,
      galleries,
    };

    await createInvitation({ data: savedata as InvitationInput });

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
