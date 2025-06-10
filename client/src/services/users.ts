import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { User } from "@/types/UserProps";
import { UserInfo } from "@/types/UserInfoProps";
import { AxiosResponse } from "axios";

export const createUser = async (
  payload: Omit<User, "createdAt" | "updatedAt" | "id"> //TOLearn: what is omit what it does why it does not remove existint data
): Promise<User> => {
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

export const updateUserFormData = async (payload: {
  id: string;
  payload: FormData;
}): Promise<UserInfo> => {
  const response: AxiosResponse<{ data: UserInfo }> = await axiosAdmin.put(
    `${URLS.USERS}/${payload.id}`,
    payload.payload,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data.data;
};

export const updateUserProfile = async (payload: {
  payload: FormData;
}): Promise<UserInfo> => {
  const response: AxiosResponse<{ data: UserInfo }> = await axiosAdmin.patch(
    `${URLS.USERS}/profile-update`,
    payload.payload,
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

export const fetchUsers = async (): Promise<UserInfo[]> => {
  const response: AxiosResponse<{ data: UserInfo[] }> = await axiosAdmin.get(
    `${URLS.USERS}`
  );
  return response.data.data;
};

export const fetchUserInfo = async (id: string): Promise<UserInfo> => {
  const response: AxiosResponse<{ data: UserInfo }> = await axiosAdmin.get(
    `${URLS.USERS}/${id}`
  );
  return response.data.data;
};
