import { dbConnect } from "../utils/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/userSchema";
import { deleteSession } from "@/lib/session";

/**
 *
 * Service function
 * 비즈니스 로직을 담당하는 계층
 * 데이터베이스 작업이나 외부 API 호출 등 실제 처리해야 할 작업을 수행
 * 이 계층은 컨트롤러에서 호출되어 필요한 데이터를 처리하고 결과를 반환
 *
 */

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
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    );
  }
};

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (e) {
    console.error("비밀번호 해시 오류", e);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
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
      message: `${user.userId}님 회원가입을 축하드립니다.`,
      data: { userId: newUser.userId, email: newUser.email },
    };
  } catch (error) {
    console.error("사용자 생성 오류", error);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
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
  userId: string,
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
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    );
  }
};

export const updateUser = async (
  id: string,
  updateData: Partial<{ email: string; password: string }>,
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
        user.password,
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
      },
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
