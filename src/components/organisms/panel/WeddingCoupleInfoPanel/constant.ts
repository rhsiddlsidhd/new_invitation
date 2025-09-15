export const COUPLE_FIELDS = {
  groom: [
    {
      id: "groomName",
      label: "신랑 성함",
      name: "groom-name",
      type: "text",
      required: true,
      placeholder: "신랑 성함",
    },
    {
      id: "groomPhone",
      label: "전화 번호",
      name: "groom-phone",
      type: "tel",
      required: true,
      placeholder: "000-0000-0000",
    },
    {
      id: "groomAccount",
      label: "계좌 번호",
      name: "groom-account",
      type: "text",
      required: true,
      placeholder: "계좌 번호",
    },
  ],
  bride: [
    {
      id: "brideName",
      label: "신부 성함",
      name: "bride-name",
      type: "text",
      required: true,
      placeholder: "신부 성함",
    },
    {
      id: "bridePhone",
      label: "전화 번호",
      name: "bride-phone",
      type: "tel",
      required: true,
      placeholder: "000-0000-0000",
    },
    {
      id: "brideAccount",
      label: "계좌 번호",
      name: "bride-account",
      type: "text",
      required: true,
      placeholder: "계좌 번호",
    },
  ],
} as const;
