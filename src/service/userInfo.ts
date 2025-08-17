import axiosInstance from "@/lib/axios-instance";

export const getUsername = async (token: string) => {
  if (!token || token == null) {
    console.error("Token Missing");
    return;
  }
  try {
    const res = await axiosInstance("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
