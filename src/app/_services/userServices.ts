import User from "../_models/userSchema";
import { dbConnect } from "./../_utils/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { ApiResponse, UserId } from "../_types";

export const checkUserDuplicate = async (email: string, userId: string) => {
  try {
    await dbConnect();
    const existingUser = await User.findOne({
      $or: [{ email }, { userId }],
    });
    if (existingUser) {
      return {
        success: false,
        message: "이미 존재하는 이메일 또는 사용자 ID입니다.",
      };
    }
    return { success: true };
  } catch (e) {
    console.error("사용자 중복 체크 오류", e);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (e) {
    console.error("비밀번호 해시 오류", e);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};

interface NewUser {
  userId: string;
  email: string;
  password: string;
}

export const createUser = async (user: NewUser) => {
  try {
    await dbConnect();

    // 새 사용자 생성
    const newUser = new User(user);

    await newUser.save();

    return {
      success: true,
      message: "사용자가 성공적으로 생성되었습니다.",
      data: { userId: newUser.userId, email: newUser.email },
    };
  } catch (error) {
    console.error("사용자 생성 오류", error);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
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

export const checkUserIdExists = async (
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
    console.error("서버 오류", error);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
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
type UserPassword =
  | { success: true; data: { password: string } }
  | LoginFailure;
type UserEmail = { success: true; data: { email: string } } | LoginFailure;

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
    console.error("사용자 조회 오류", error);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};

export const getUserPasswordById = async (
  userId: string
): Promise<UserPassword> => {
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
        password: user.password,
      },
    };
  } catch (error) {
    console.error("사용자 조회 오류", error);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
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

export const updateUserEmail = async (
  id: string,
  updateData: Partial<{ email: string; password: string }>
): Promise<UserEmail> => {
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
    console.error(error);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
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
    };
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("bcrypt 검증 오류:", error);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
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
