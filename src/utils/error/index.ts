import { APIFAILRESPONSE } from "@/types/api";
import { CustomError } from "@/types/error";

const HttpError = (e: unknown): APIFAILRESPONSE => {
  if (e instanceof CustomError) {
    return {
      success: false,
      error: {
        code: e.code,
        message: e.message,
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

export default HttpError;
