import { APIFAILRESPONSE } from "@/shared/types/api";
import { CustomError } from "@/shared/types/error";
import { NextResponse } from "next/server";

export const actionHttpError = (e: unknown): APIFAILRESPONSE => {
  if (e instanceof CustomError) {
    return {
      success: false,
      error: {
        code: e.code,
        message: e.message,
        fieldErrors: e.fieldErrors,
      },
    };
  }

  return {
    success: false,
    error: {
      code: 500,
      message: "잠시 후 다시 시도해주세요.",
    },
  };
};

export const handlerApiError = (e: unknown) => {
  if (e instanceof CustomError) {
    const { code, message } = e;
    const status = code >= 100 && code <= 599 ? code : 500;
    return NextResponse.json({ success: false, message }, { status });
  } else {
    return NextResponse.json(
      { success: false, message: "잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }
};

// export const clientApiError = (e:unknown)=>{
// }
