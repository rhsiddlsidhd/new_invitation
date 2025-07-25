import { FormState, SignupFormSchema } from "@/app/_lib/definitions";
import { createSession } from "@/app/_lib/session";
import React from "react";

const page = async (state: FormState, formData: FormData) => {
  //   const validatedFields = SignupFormSchema.safeParse({
  //     userId: formData.get("userId"),
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   });

  //   // If any form fields are invalid, return early
  //   if (!validatedFields.success) {
  //     return {
  //       errors: validatedFields.error.flatten().fieldErrors,
  //     };
  //   }

  //   const {userId,email,password} =validatedFields.data
  //   await createSession(userId)
  return <div></div>;
};

export default page;
