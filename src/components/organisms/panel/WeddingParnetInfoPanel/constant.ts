import { ParentLabelName, ParentRoleId } from "./type";

export const parentRoles: {
  roleId: ParentRoleId;
  roleLabel: ParentLabelName;
}[] = [
  { roleId: "groom-father", roleLabel: "신랑측 부" },
  { roleId: "groom-mother", roleLabel: "신랑측 모" },
  { roleId: "bride-father", roleLabel: "신부측 부" },
  { roleId: "bride-mother", roleLabel: "신부측 모" },
];

export const fieldTypes = [
  { label: "성함", type: "text", suffix: "name" },
  { label: "전화번호", type: "tel", suffix: "phone" },
  { label: "계좌번호", type: "tel", suffix: "account" },
] as const;
