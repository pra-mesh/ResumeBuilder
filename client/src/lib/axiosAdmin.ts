import axios from "axios";
import { API_URL, URLS } from "@/constants";
import { decodeJWT } from "@/lib/jwt";
import { setItem } from "@/lib/storage";

//could you please explains this once again

export const createAxiosAdmin = (
  getAuth: () => { accessToken: string | null; refreshToken: string | null },
  logout: () => void
) => {
  const axiosAdminInstance = axios.create({
    baseURL: API_URL,
    timeout: 6000,
  });
  //TODO: Backend ma set api_limit
  //TODO: How to get role

  //Request Interceptor
  axiosAdminInstance.interceptors.request.use(
    (config) => {
      const { accessToken } = getAuth();
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
      const { accessToken, refreshToken } = getAuth();
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
          const newAccessToken = res?.data?.access_token;
          const newRefreshToken = res?.data?.refresh_token;
          if (refreshToken && accessToken) {
            setItem("access_token", newAccessToken);
            setItem("refresh_token", newRefreshToken);
            originalRequest.headers.access_token = accessToken;
            return axiosAdminInstance(originalRequest);
          }
        } catch (e) {
          console.log("Token refresh failed", e);
          //FIXME: Logout and error handling
          logout();
          //return Promise.reject(e);
        }
      }
      return Promise.reject(err);
    }
  );
  return axiosAdminInstance;
};
