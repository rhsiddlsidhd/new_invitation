"use server";
import { ActionState } from "@/types";
import z from "zod";

export const createInvitationInfo = async (
  prev: ActionState | null,
  formData: FormData,
) => {
  console.log(formData);
  const groomName = formData.get("groom-name") as string;
  const bribeName = formData.get("bribe-name") as string;

  console.log(groomName);

  return {
    success: true,
  };
};

/**
 * const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/; // 한국 휴대폰 번호 패턴(예시)
  const accountRegex = /^[0-9-]{8,30}$/; // 숫자, 하이픈만 허용, 8~30자(은행 계좌 예시)

  const textschema = z.object({
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

  const result = textschema.safeParse(formData);
  if (!result.success) {
    return {
      success: false,
      message: result.error.message,
    };
  }

 */
