import User from "../_models/userSchema";
import { dbConnect } from "./../_utils/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { ApiResponse, UserId } from "../_types";

export const createUser = async ({ formData }: { formData: FormData }) => {
  try {
    await dbConnect();

    const email = formData.get("email") as string;
    const userId = formData.get("userId") as string;
    const password = formData.get("password") as string;

    // 이미 존재하는 사용자 확인
    const existingUser = await User.findOne({
      $or: [{ email }, { userId }],
    });

    if (existingUser) {
      return {
        success: false,
        message: "이미 존재하는 이메일 또는 사용자 ID입니다.",
      };
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 12);

    // 새 사용자 생성
    const newUser = new User({
      email,
      userId,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      success: true,
      message: "사용자가 성공적으로 생성되었습니다.",
      data: { userId: newUser.userId, email: newUser.email },
    };
  } catch (error) {
    throw error;
  }
};

interface LoginSuccess {
  success: true;
  data: {
    userId: string;
    password: string;
  };
}

interface LoginFailure {
  success: false;
  message: string;
}

type UserCredentials = LoginSuccess | LoginFailure;

export const getLoginUser = async (
  userId: string
): Promise<UserCredentials> => {
  try {
    await dbConnect();

    const user = await User.findOne({ userId, isDelete: false });

    if (!user) {
      return {
        success: false,
        message: "사용자를 찾을 수 없습니다.",
      };
    }

    return {
      success: true,
      data: {
        userId: user.userId,
        password: user.password,
      },
    };
  } catch (error) {
    throw error;
  }
};

interface UserDataSuccess {
  success: true;
  data: {
    email: string;
    userId: string;
  };
}

type Userdata = UserDataSuccess | LoginFailure;

export const getUserById = async (userId: string): Promise<Userdata> => {
  try {
    await dbConnect();

    const user = await User.findOne({ userId, isDelete: false });

    if (!user) {
      return {
        success: false,
        message: "사용자를 찾을 수 없습니다.",
      };
    }

    return {
      success: true,
      data: {
        email: user.email,
        userId: user.userId,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  id: string,
  updateData: Partial<{ email: string; password: string }>
) => {
  try {
    await dbConnect();

    const user = await User.findOne({ userId: id });

    if (!user || user.isDelete) {
      return {
        success: false,
        message: "사용자를 찾을 수 없습니다.",
      };
    }

    // 비밀번호 확인 (현재 비밀번호가 맞는지 검증)
    if (updateData.password) {
      const isPasswordValid = await bcrypt.compare(
        updateData.password,
        user.password
      );
      if (!isPasswordValid) {
        return {
          success: false,
          message: "현재 비밀번호가 올바르지 않습니다.",
        };
      }
    }

    const dataToUpdate: Partial<{ email: string }> = {};
    if (updateData.email) {
      dataToUpdate.email = updateData.email;
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId: id },
      dataToUpdate,
      {
        new: true,
      }
    );

    return {
      success: true,
      data: {
        email: updatedUser.email,
      },
    };
  } catch (error) {
    throw error;
  }
};

// 비밀번호 변경 전용 함수
export const changePassword = async (id: string, newPassword: string) => {
  try {
    await dbConnect();

    // 새 비밀번호 해싱
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // 비밀번호 업데이트
    await User.findOneAndUpdate(
      { userId: id },
      { password: hashedNewPassword }
    );

    return {
      success: true,
      message: "비밀번호가 성공적으로 변경되었습니다.",
    };
  } catch (error) {
    console.error("비밀번호 변경 오류:", error);
    return {
      success: false,
      message: "비밀번호 변경 중 오류가 발생했습니다.",
    };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await dbConnect();

    const user = await User.findOneAndUpdate(
      { userId: id },
      { isDelete: true },
      { new: true }
    );

    if (!user || user.isDelete) {
      return {
        success: false,
        message: "사용자를 찾을 수 없습니다.",
      };
    }

    return {
      success: true,
      message: "사용자가 삭제되었습니다.",
    };
  } catch (error) {
    console.error("사용자 삭제 오류:", error);
    return {
      success: false,
      message: "사용자 삭제 중 오류가 발생했습니다.",
    };
  }
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("비밀번호 검증 오류:", error);
    return false;
  }
};

interface CreateTokens {
  refreshToken: string;
  accessToken: string;
}

export const createTokens = (userId: string): CreateTokens | undefined => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) return;
  const refresh = jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
  const access = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });

  return {
    refreshToken: refresh,
    accessToken: access,
  };
};

interface SuccessAuthResult {
  success: true;
  decoded: jwt.JwtPayload;
  newAccessToken: string | null;
}

interface FailAuthResult {
  success: false;
  message: string;
}

type AuthResult = SuccessAuthResult | FailAuthResult;

export const authenticateWithToken = async (
  token: string
): Promise<AuthResult> => {
  /**
   * Access token 검증 로직
   * access token의 유효성 확인 이후
   * refresh token이 유효한지 확인
   * 둘다 무효라면 false 반환
   * access token이 유효하다면 true 반환
   * refresh token이 유효하다면 access token 재발급 및 true 반환
   */
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey)
    return { success: false, message: "JWT Secret이 설정되지 않았습니다." };

  try {
    // Access Token 검증
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    return {
      success: true,
      decoded,
      newAccessToken: null,
    };
  } catch {
    // Access Token 만료 → Refresh Token 시도
    const cookieStore = await cookies();
    const refreshTokenCookie = cookieStore.get("token");

    if (!refreshTokenCookie?.value) {
      return { success: false, message: "Refresh Token이 없습니다." };
    }

    return await canRefreshToken(refreshTokenCookie.value);
  }
};

const canRefreshToken = async (token: string): Promise<AuthResult> => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey)
    return { success: false, message: "JWT Secret이 설정되지 않았습니다." };

  try {
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

    // 새 Access Token 발급
    const newAccessToken = jwt.sign({ userId: decoded.userId }, secretKey, {
      expiresIn: "1h",
    });

    return {
      success: true,
      decoded,
      newAccessToken,
    };
  } catch {
    return { success: false, message: "Refresh Token이 유효하지 않습니다." };
  }
};

export const getUserIdbyToken = async (
  token: string
): Promise<ApiResponse<UserId>> => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey)
    return { success: false, message: "JWT Secret이 설정되지 않았습니다." };

  try {
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    return {
      success: true,
      data: { userId: decoded.userId },
    };
  } catch {
    return { success: false, message: "유효하지 않은 토큰입니다." };
  }
};

// export const getLoginUser = async (
//   userId: string
// ): Promise<UserCredentials> => {
//   try {
//     await dbConnect();

//     const user = await User.findOne({ userId, isDelete: false });

//     if (!user) {
//       return {
//         success: false,
//         message: "사용자를 찾을 수 없습니다.",
//       };
//     }

//     return {
//       success: true,
//       data: {
//         userId: user.userId,
//         password: user.password,
//       },
//     };
//   } catch (error) {
//     throw error;
//   }
// };
