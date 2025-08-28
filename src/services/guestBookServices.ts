import GuestBook from "@/models/guestBookSchema";
import { GuestBook as GuestBookType } from "@/types";
import { dbConnect } from "@/utils/mongodb";

export const createGuestBook = async ({
  id,
  data,
}: {
  id: string;
  data: GuestBookType;
}) => {
  await dbConnect();
  const newGuestBook = new GuestBook({ ...data, userId: id });
  await newGuestBook.save();
  return {
    success: true,
    message: "방명록 작성이 완료되었습니다.",
  };
};
