import { UserInfo } from "@/interface/UserInfoProps";
import { createAxiosAdmin } from "./createAxiosAdmin";
import { getItem, setItem } from "./storage";

const getAuth = () => ({
  accessToken: getItem("access_token"),
  refreshToken: getItem("refresh_token"),
});

const logout = () => {};
const onTokenRefresh = (
  newAccess: string,
  newRefresh: string,
  user: UserInfo | null
) => {
  setItem("access_token", newAccess);
  setItem("refresh_token", newRefresh);
  setItem("user", JSON.stringify(user));
};
export const axiosAdmin = createAxiosAdmin(getAuth, logout, onTokenRefresh);
