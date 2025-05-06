import { URLS } from "@/constants";
import { axiosInstance } from "@/lib/axios";

export const forgetPassword = async ({ email = "" }) => {
  try {
    const { data } = await axiosInstance.post(`${URLS.Auth}/forget-password`, {
      email,
    });
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};
