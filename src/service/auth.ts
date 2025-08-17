import axiosInstance from "@/lib/axios-instance";

export const login = async (email: string, password: string) => {
  const res = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });
  const data = res.data;
  localStorage.setItem("token", data.token);
};

export const register = async (username: string, email: string, password: string) => {
  const res = await axiosInstance.post("/api/auth/register", {
    username,
    email,
    password,
  });

  return res.data.message;
};
