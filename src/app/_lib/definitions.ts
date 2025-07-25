import { z } from "zod";

export const SignupFormSchema = z.object({
  userId: z
    .string()
    .min(2, { message: "User ID must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        userId?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
