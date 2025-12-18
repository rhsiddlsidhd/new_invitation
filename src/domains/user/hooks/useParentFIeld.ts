import {
  fieldTypes,
  parentRoles,
} from "@/components/organisms/panel/WeddingParnetInfoPanel/constant";
import { useUserStore } from "@/domains/user";

import { useCallback, useMemo } from "react";

const useParentField = () => {
  const {
    groomFatherName,
    groomFatherAccount,
    groomFatherPhone,
    groomMotherName,
    groomMotherPhone,
    groomMotherAccount,
    brideMotherName,
    brideMotherPhone,
    brideMotherAccount,
    brideFatherAccount,
    brideFatherName,
    brideFatherPhone,
    errors,
    isUser,
  } = useUserStore();

  const getFieldValue = useCallback(
    (roleId: string, suffix: string) => {
      switch (`${roleId}-${suffix}`) {
        case "groom-father-name":
          return groomFatherName;
        case "groom-father-phone":
          return groomFatherPhone;
        case "groom-father-account":
          return groomFatherAccount;
        case "groom-mother-name":
          return groomMotherName;
        case "groom-mother-phone":
          return groomMotherPhone;
        case "groom-mother-account":
          return groomMotherAccount;
        case "bride-father-name":
          return brideFatherName;
        case "bride-father-phone":
          return brideFatherPhone;
        case "bride-father-account":
          return brideFatherAccount;
        case "bride-mother-name":
          return brideMotherName;
        case "bride-mother-phone":
          return brideMotherPhone;
        case "bride-mother-account":
          return brideMotherAccount;
        default:
          return "";
      }
    },
    [
      groomFatherName,
      groomFatherPhone,
      groomFatherAccount,
      groomMotherName,
      groomMotherPhone,
      groomMotherAccount,
      brideFatherName,
      brideFatherPhone,
      brideFatherAccount,
      brideMotherName,
      brideMotherPhone,
      brideMotherAccount,
    ],
  );

  const parentFields = useMemo(
    () =>
      parentRoles.map(({ roleId, roleLabel }) => ({
        roleId,
        roleLabel,
        fields: fieldTypes.map(({ label, type, suffix }) => ({
          label,
          name: `${roleId}-${suffix}`,
          type,
          required: false,
          value: getFieldValue(roleId, suffix),
        })),
      })),
    [getFieldValue],
  );

  return { parentFields, errors, isUser };
};

export default useParentField;
