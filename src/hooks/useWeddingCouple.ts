import { COUPLE_FIELDS } from "@/components/organisms/panel/WeddingCoupleInfoPanel/constant";
import { useUserStore } from "@/store/userStore";
import { useMemo } from "react";

const useWeddingCouple = () => {
  const groomName = useUserStore((state) => state.groomName);
  const groomAccount = useUserStore((state) => state.groomAccount);
  const groomPhone = useUserStore((state) => state.groomPhone);

  const brideName = useUserStore((state) => state.brideName);
  const brideAccount = useUserStore((state) => state.brideAccount);
  const bridePhone = useUserStore((state) => state.bridePhone);

  const errors = useUserStore((state) => state.errors);
  const isUser = useUserStore((state) => state.isUser);

  const groomFields = useMemo(
    () =>
      COUPLE_FIELDS.groom.map((field) => ({
        ...field,
        value:
          field.id === "groomName"
            ? groomName
            : field.id === "groomPhone"
              ? groomPhone
              : groomAccount,
      })),
    [groomName, groomPhone, groomAccount],
  );

  const brideFields = useMemo(
    () =>
      COUPLE_FIELDS.bride.map((field) => ({
        ...field,
        value:
          field.id === "brideName"
            ? brideName
            : field.id === "bridePhone"
              ? bridePhone
              : brideAccount,
      })),
    [brideName, bridePhone, brideAccount],
  );

  return { groomFields, brideFields, errors, isUser };
};

export default useWeddingCouple;
