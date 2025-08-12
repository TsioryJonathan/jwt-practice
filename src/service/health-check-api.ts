import axiosInstance from "@/lib/axios-instance";

export const healthCheckApi = {
  hello: () => axiosInstance.get<{ message: string }>("/api/health-check/hello"),
  ping: () => axiosInstance.get<{ message: string }>("/api/health-check/ping"),
};
