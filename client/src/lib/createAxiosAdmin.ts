import axios from "axios";
import { API_URL, URLS } from "@/constants";
import { decodeJWT } from "@/lib/jwt";
import { UserInfo } from "@/interface/UserInfoProps";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const createAxiosAdmin = (
  getAuth: () => { accessToken: string | null; refreshToken: string | null },
  logout: () => void,
  onTokenRefresh?: (
    access: string,
    refresh: string,
    user: UserInfo | null
  ) => void
) => {
  const axiosAdminInstance = axios.create({
    baseURL: API_URL,
    timeout: 6000,
  });

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
        if (isRefreshing) {
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers.access_token = token;
            return axiosAdminInstance(originalRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const { data }: any = decodeJWT(accessToken);
        
        try {
          const res = await axios.post(`${URLS.Auth}/refresh`, {
            refresh_token: refreshToken,
            email: data?.email,
          });

          const newAccess = res?.data?.access_token;
          const newRefresh = res?.data?.refresh_token;
          const user: UserInfo = {
            name: data?.name,
            email: data?.email,
            avatar: "",
            role: data?.roles,
          };

          onTokenRefresh?.(newAccess, newRefresh, user);
          
          originalRequest.headers.access_token = newAccess;
          processQueue(null, newAccess);
          
          return axiosAdminInstance(originalRequest);
        } catch (error) {
          processQueue(error, null);
          logout();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(err);
    }
  );
  return axiosAdminInstance;
};