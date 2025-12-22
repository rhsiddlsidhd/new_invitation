import z from "zod";
import { PWSchema } from "./pw.schema";

export const PWConfirmSchema = z
  .object({
    password: PWSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
