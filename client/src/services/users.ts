import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { User } from "@/types/UserProps";
import { UserInfo } from "@/types/UserInfoProps";
import { AxiosResponse } from "axios";

export const createUser = async (payload: User): Promise<User> => {
  const response: AxiosResponse<{ data: User }> = await axiosAdmin.post(
    `${URLS.USERS}`,
    payload
  );
  return response.data.data;
};
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

export const updateUserFormData = async (
  id: string,
  payload: FormData
): Promise<User> => {
  const response: AxiosResponse<{ data: User }> = await axiosAdmin.put(
    `${URLS.USERS}/${id}`,
    payload,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data.data;
};

export const createUserFormData = async (payload: FormData): Promise<User> => {
  const response: AxiosResponse<{ data: User }> = await axiosAdmin.post(
    `${URLS.USERS}`,
    payload,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data.data;
};

export const fetchUserInfo = async (id: string): Promise<UserInfo> => {
  const response: AxiosResponse<{ data: UserInfo }> = await axiosAdmin.get(
    `${URLS.USERS}/${id}`
  );
  return response.data.data;
};
