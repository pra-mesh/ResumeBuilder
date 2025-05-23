import { createAxiosAdmin } from "./createAxiosAdmin";
import { getItem, setItem } from "./storage";

const getAuth = () => ({
  accessToken: getItem("access_token"),
  refreshToken: getItem("refresh_token"),
});

const logout = () => {};
const onTokenRefresh = (newAccess: string, newRefresh: string) => {
  setItem("access_token", newAccess);
  setItem("refresh_token", newRefresh);
};
export const axiosAdmin = createAxiosAdmin(getAuth, logout, onTokenRefresh);
