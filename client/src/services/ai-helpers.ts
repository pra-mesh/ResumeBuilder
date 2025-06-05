import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";

export const getAIResponse = async (query: string) => {
  try {
    return "I am a eesa"
    const { data } = await axiosAdmin.post(`${URLS.Assistant}`, {
      query,
    });
    console.log({ data });
    return data.data;
  } catch (error: any) {
    console.log({ msg: error?.response?.data?.err });
    throw new Error(error?.response?.data?.err);
  }
};
