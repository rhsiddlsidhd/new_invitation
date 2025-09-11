export const signInFields = [
  {
    type: "text",
    name: "userId",
    required: true,
    autoComplete: "username",
    label: "아이디:",
  },
  {
    type: "password",
    name: "password",
    required: true,
    autoComplete: "current-password",
    label: "비밀번호:",
  },
] as const;
