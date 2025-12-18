import { GuestBook } from "@/domains/guestbook";
import { dbConnect } from "@/shared/utils/mongodb";
import { GuestBook as GuestBookType } from "@/shared/types";
import { GuestBookView } from "@/components/template/invitation/InvitationContainer";
import { comparePasswords } from "@/domains/user";

export const createGuestBook = async ({ data }: { data: GuestBookType }) => {
  await dbConnect();

  const res = await GuestBook.create(data);

  if (!res) throw new Error("Failed to create guestbook");
  return res;
};

export const getUserGuestBook = async ({ userId }: { userId: string }) => {
  await dbConnect();

  const res = await GuestBook.find({ userId })
    .select("-__v -createdAt -updatedAt -userId -password")
    .lean<GuestBookView[]>();
  if (!res) throw new Error("Failed to get guestbook");
  return res;
};

export const deleteUserGuestBook = async (id: string) => {
  await dbConnect();

  const res = await GuestBook.deleteOne({ _id: id });

  if (!res.acknowledged)
    throw new Error("서버 에러로 삭제 요청이 처리되지 않았습니다.");
  if (res.deletedCount === 0)
    throw new Error("이미 삭제되었거나 존재하지 않는 방명록입니다.");
  return true;
};

export const validateGuestBookPassword = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  await dbConnect();
  const guestBook = await GuestBook.findById(id).lean();
  if (!guestBook) throw new Error("방명록을 찾을 수 없습니다.");
  const isVeirfy = await comparePasswords(password, guestBook.password);

  return isVeirfy;
};
