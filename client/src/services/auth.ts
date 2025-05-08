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

export const restPassword = async (payload: {
  email: string;
  password: string;
  otp: string;
}) => {
  try {
    return await axiosInstance.post(
      `${URLS.Auth}/forget-password/rest-password`,
      payload
    );
  } catch (e: any) {
    throw new Error(e);
  }
};
