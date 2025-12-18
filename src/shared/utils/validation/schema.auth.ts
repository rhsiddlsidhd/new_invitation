import z from "zod";

export const PasswordSchema = z
  .string()
  .refine(
    (v) =>
      v.length >= 6 &&
      v.length <= 12 &&
      /[A-Za-z]/.test(v) &&
      /[0-9]/.test(v) &&
      /[^A-Za-z0-9]/.test(v),
    {
      message:
        "비밀번호는 영문자, 숫자, 특수문자를 포함한 최소 6자 이상 최대 12자 이하입니다.",
    },
  );

export const LoginSchema = z.object({
  email: z.email("이메일 형식이 올바르지 않습니다."),
  password: PasswordSchema,
  remember: z.boolean(),
});

export const RegisterSchema = z
  .object({
    name: z.string(),
    email: z.email("이메일 형식이 올바르지 않습니다."),
    phone: z
      .string()
      .regex(/^(01[016789])-\d{3,4}-\d{4}$/, "유효한 전화번호가 아닙니다."),
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const FindUserEmailSchema = z.object({
  name: z.string(),
  phone: z
    .string()
    .regex(/^(01[016789])-\d{3,4}-\d{4}$/, "유효한 전화번호가 아닙니다."),
});

export const PWConfirmSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
