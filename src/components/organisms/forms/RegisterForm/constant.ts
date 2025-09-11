export const registerFields = [
  {
    type: "email",
    name: "email",
    required: true,
    label: "* 이메일:",
    autoComplete: "email",
  },
  {
    type: "text",
    name: "userId",
    required: true,
    label: "* 사용자 ID:",
    autoComplete: "username",
  },
  {
    type: "password",
    name: "password",
    required: true,
    label: "* 비밀번호:",
    autoComplete: "new-password",
  },
  {
    type: "password",
    name: "confirmPassword",
    required: true,
    label: "* 비밀번호 확인:",
    autoComplete: "new-password",
  },
] as const;
