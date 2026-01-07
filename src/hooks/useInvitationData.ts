
import { useMemo } from "react";
import { ICoupleInfo } from "@/models/coupleInfo.model";
import { useModalStore } from "@/shared/store/modalStore";
import {
  GuestBookView,
  PhonePayload,
  AccountPayload,
} from "@/types/invitation";

const useInvitationData = (
  userInfo: ICoupleInfo,
  guestBook: GuestBookView[]
) => {
  const { setModalOpen } = useModalStore();

  const {
    userId,
    weddingDate,
    thumbnailImages,
    groom,
    bride,
    address,
    addressDetail,
    galleryImages,
    message,
    guestbookEnabled,
    subwayStation,
    venue,
  } = userInfo;

  const partyRows = useMemo(() => {
    return [
      {
        parentNames: [groom.father?.name, groom.mother?.name].filter(
          Boolean
        ) as string[],
        childName: groom.name,
        childSuffix: "아들" as const,
      },
      {
        parentNames: [bride.father?.name, bride.mother?.name].filter(
          Boolean
        ) as string[],
        childName: bride.name,
        childSuffix: "딸" as const,
      },
    ];
  }, [groom, bride]);

  const phonePayload: PhonePayload[] = useMemo(() => {
    return [
      { id: "groom", name: groom.name, phone: groom.phone, role: "신랑" },
      {
        id: "groomFather",
        name: groom.father?.name ?? "",
        phone: groom.father?.phone ?? "",
        role: "신랑 아버지",
      },
      {
        id: "groomMother",
        name: groom.mother?.name ?? "",
        phone: groom.mother?.phone ?? "",
        role: "신랑 어머니",
      },
      { id: "bride", name: bride.name, phone: bride.phone, role: "신부" },
      {
        id: "brideFather",
        name: bride.father?.name ?? "",
        phone: bride.father?.phone ?? "",
        role: "신부 아버지",
      },
      {
        id: "brideMother",
        name: bride.mother?.name ?? "",
        phone: bride.mother?.phone ?? "",
        role: "신부 어머니",
      },
    ].filter((p) => p.name && p.phone);
  }, [groom, bride]);

  const accountPayload: AccountPayload[] = useMemo(() => {
    const formatAccount = (person: { bankName?: string, accountNumber?: string } | undefined) => {
      if (!person || !person.bankName || !person.accountNumber) return "";
      return `${person.bankName} ${person.accountNumber}`;
    }

    return [
      {
        id: "groom",
        account: formatAccount(groom),
        name: groom.name,
        role: "신랑",
      },
      {
        id: "groomFather",
        account: formatAccount(groom.father),
        name: groom.father?.name ?? "",
        role: "신랑 아버지",
      },
      {
        id: "groomMother",
        account: formatAccount(groom.mother),
        name: groom.mother?.name ?? "",
        role: "신랑 어머니",
      },
      {
        id: "bride",
        account: formatAccount(bride),
        name: bride.name,
        role: "신부",
      },
      {
        id: "brideFather",
        account: formatAccount(bride.father),
        name: bride.father?.name ?? "",
        role: "신부 아버지",
      },
      {
        id: "brideMother",
        account: formatAccount(bride.mother),
        name: bride.mother?.name ?? "",
        role: "신부 어머니",
      },
    ].filter((p) => p.name && p.account.trim() !== "");
  }, [groom, bride]);

  const guestBookBtns = useMemo(() => {
    return [
      {
        label: "방명록 작성하기",
        onClick: () => {
          setModalOpen({
            isOpen: true,
            type: "guest-book-write",
            payload: { userId: userId.toString() },
          });
        },
      },
      {
        label: "방명록 전체보기",
        onClick: () => {
          setModalOpen({
            isOpen: true,
            type: "guest-book-view",
            config: { backgroundColor: "transparent" },
            payload: guestBook,
          });
        },
      },
    ];
  }, [userId, guestBook, setModalOpen]);

  return {
    weddingDate,
    thumbnailImages,
    groom,
    bride,
    address,
    addressDetail,
    galleryImages,
    message,
    guestbookEnabled,
    subwayStation,
    venue,
    partyRows,
    phonePayload,
    accountPayload,
    guestBookBtns,
    setModalOpen,
  };
};

export default useInvitationData;
