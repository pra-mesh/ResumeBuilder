import axios from "axios";
import { API_URL, URLS } from "@/constants";
import { decodeJWT } from "@/lib/jwt";
import { setItem } from "@/lib/storage";

let accessToken = localStorage.getItem("access_token");
let refreshToken = localStorage.getItem("refresh_token");

const axiosAdminInstance = axios.create({
  baseURL: API_URL,
  timeout: 6000,
});
//TODO: Backend ma set api_limit

//Request Interceptor
axiosAdminInstance.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers.access_token = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Response Interceptor
axiosAdminInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;
    if (
      refreshToken &&
      err.response?.status === 500 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const { data }: any = decodeJWT(accessToken);
      try {
        const res = await axios.post(`${URLS.Auth}/refresh`, {
          refresh_token: refreshToken,
          email: data?.email,
        });
        accessToken = res?.data?.access_token;
        refreshToken = res?.data?.refresh_token;
        if (refreshToken && accessToken) {
          setItem("access_token", accessToken);
          setItem("refresh_token", refreshToken);
          originalRequest.headers.access_token = accessToken;
          return axiosAdminInstance(originalRequest);
        }
      } catch (e) {
        console.log("Token refresh failed", e);
        //FIXME: Logout and error handling
      }
    }
    return Promise.reject(err);
  }
);
export default axiosAdminInstance;
