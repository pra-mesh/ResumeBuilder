import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { User } from "@/types/UserFormProps";
import { AxiosResponse } from "axios";

export const createUser = () => {};
export const fetchUser = async (id: string): Promise<User> => {
  const response: AxiosResponse<{ data: User }> = await axiosAdmin.get(
    `${URLS.USERS}/${id}`
  );
  return response.data.data;
};
export const updateUser = async (id: string, payload: User): Promise<User> => {
  const response: AxiosResponse<{ data: User }> = await axiosAdmin.put(
    `${URLS.USERS}/${id}`,
    payload
  );
  return response.data.data;
};
