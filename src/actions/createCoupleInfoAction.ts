"use server";

import { handleActionError } from "@/api/error";
import { APIResponse, success } from "@/api/response";
import { HTTPError } from "@/api/type";
import { getCookie } from "@/lib/cookies/get";
import { decrypt } from "@/lib/token";
import { validateAndFlatten } from "@/lib/validation";
import { coupleInfoSchema } from "@/schemas/coupleInfo.schema";
import { createCoupleInfoService } from "@/services/coupleInfo.service";

export const createCoupleInfoAction = async (
  prev: unknown,
  formData: FormData,
): Promise<APIResponse<{ message: string }>> => {
  try {
    const cookie = await getCookie("token");

    if (!cookie?.value) {
      throw new HTTPError("로그인이 필요합니다.", 401, undefined, "/");
    }

    const { payload } = await decrypt({ token: cookie.value, type: "REFRESH" });

    if (!payload.id) throw new HTTPError("유효하지 않은 토큰입니다.", 401);

    // const headersList = await headers();
    //   const authHeader = headersList.get("Authorization");

    //   if (!authHeader?.startsWith("Bearer ")) {
    //     throw new HTTPError("접근 권한이 없습니다. 로그인 후 이용해주세요.", 401);
    //   }

    //   const accessToken = authHeader.substring(7);

    //   const { payload } = await decrypt({ token: accessToken, type: "ACCESS" });

    //   if (!payload.id) throw new HTTPError("유효하지 않은 토큰입니다.", 401);

    const thumbnailRaw = formData.get("thumbnailSource") as string;
    const galleryRaw = formData.get("gallerySource") as string;

    // Transform gallery data from { name, images }[] to { category, urls }[]
    const galleryData = galleryRaw
      ? JSON.parse(galleryRaw).map(
          (item: { name: string; images: string[] }) => ({
            category: item.name,
            urls: item.images,
          }),
        )
      : [];

    // Helper to build parent data only if name is provided
    const buildParentData = (prefix: string) => {
      const name = formData.get(`${prefix}_name`) as string;
      const phone = formData.get(`${prefix}_phone`) as string;

      if (!name || !phone) return undefined;

      return {
        name,
        phone,
        bankName: formData.get(`${prefix}_bank_name`) as string,
        accountNumber: formData.get(`${prefix}_account_number`) as string,
      };
    };

    const data = {
      groom: {
        name: formData.get("groom_name") as string,
        phone: formData.get("groom_phone") as string,
        bankName: formData.get("groom_bank_name") as string,
        accountNumber: formData.get("groom_account_number") as string,
        father: buildParentData("groom_parents_father"),
        mother: buildParentData("groom_parents_mother"),
      },
      bride: {
        name: formData.get("bride_name") as string,
        phone: formData.get("bride_phone") as string,
        bankName: formData.get("bride_bank_name") as string,
        accountNumber: formData.get("bride_account_number") as string,
        father: buildParentData("bride_parents_father"),
        mother: buildParentData("bride_parents_mother"),
      },
      weddingDate: formData.get("wedding_date") as string,
      weddingTime: formData.get("wedding_time") as string,
      venue: formData.get("venue_name") as string,
      address: formData.get("venue_address") as string,
      subwayStation: formData.get("subway_station") as string,
      guestbookEnabled: formData.get("guestbook_enabled") === "on",
      thumbnailImages: thumbnailRaw ? JSON.parse(thumbnailRaw) : [],
      galleryImages: galleryData,
    };

    const parsed = validateAndFlatten(coupleInfoSchema, data);

    if (!parsed.success) {
      throw new HTTPError("입력값을 확인해주세요", 400, parsed.error);
    }

    const weddingDateTime = new Date(
      `${parsed.data.weddingDate}T${parsed.data.weddingTime}`,
    );
    console.log(parsed.data);
    const coupleInfo = await createCoupleInfoService({
      userId: payload.id,
      groom: parsed.data.groom,
      bride: parsed.data.bride,
      weddingDate: weddingDateTime,
      venue: parsed.data.venue,
      address: parsed.data.address,
      message: undefined, // Default empty message - can be updated later
      subwayStation: parsed.data.subwayStation,
      guestbookEnabled: parsed.data.guestbookEnabled,
      thumbnailImages: parsed.data.thumbnailImages,
      galleryImages: parsed.data.galleryImages,
    });

    if (!coupleInfo)
      throw new HTTPError("커플 정보 등록에 실패하였습니다.", 500);

    return success({
      message: "커플 정보가 성공적으로 등록되었습니다.",
    });
  } catch (e) {
    return handleActionError(e);
  }
};
