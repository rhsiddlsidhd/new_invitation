// API 호출을 위한 유틸리티 함수들

export const registerUser = async (userData: {
  email: string;
  userId: string;
  password: string;
}) => {
  const formData = new FormData();
  formData.append("email", userData.email);
  formData.append("userId", userData.userId);
  formData.append("password", userData.password);

  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: formData,
  });
  return await response.json();
};

export const loginUser = async (credentials: {
  userId: string;
  password: string;
}) => {
  const formData = new FormData();
  formData.append("userId", credentials.userId);
  formData.append("password", credentials.password);

  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: formData,
  });

  return await response.json();
};

export const verifyPassword = async (credentials: {
  password: string;
  token: string;
}) => {
  const formData = new FormData();
  formData.append("password", credentials.password);

  const res = await fetch("/api/auth/verify-password", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.token}`,
    },
    body: formData,
  });

  return await res.json();
};

// export const getUserById = async (id: string) => {
//   const response = await fetch(`/api/users/${id}`, {
//     method: "GET",
//   });

//   return await response.json();
// };

export const updateUser = async (updateData: {
  email: string;
  password: string;
}) => {
  const token = sessionStorage.getItem("token");
  if (!token) return;
  const formData = new FormData();
  formData.append("email", updateData.email);
  formData.append("password", updateData.password);
  const response = await fetch(`/api/user/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await response.json();
};

export const updateUserPassword = async (updateData: {
  password: string;
  passwordConfirm: string;
}) => {
  const token = sessionStorage.getItem("token");
  if (!token) return;
  const formData = new FormData();
  formData.append("password", updateData.password);

  const res = await fetch("/api/user/password", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return await res.json();
};

export const deleteUser = async (id: string) => {
  const token = sessionStorage.getItem("token");
  if (!token) return;
  const res = await fetch(`/api/user/me`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
