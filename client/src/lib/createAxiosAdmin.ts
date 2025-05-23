import axios from "axios";
import { API_URL, URLS } from "@/constants";
import { decodeJWT } from "@/lib/jwt";

//could you please explains this once again

export const createAxiosAdmin = (
  getAuth: () => { accessToken: string | null; refreshToken: string | null },
  logout: () => void,
  onTokenRefresh?: (access: string, refresh: string) => void
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
        err.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const { data }: any = decodeJWT(accessToken);

        try {
          const res = await axios.post(`${URLS.Auth}/refresh`, {
            refresh_token: refreshToken,
            email: data?.email,
          });

          const newAccess = res?.data?.access_token;
          const newRefresh = res?.data?.refresh_token;

          onTokenRefresh?.(newAccess, newRefresh);
          originalRequest.headers.access_token = newAccess;
          return axiosAdminInstance(originalRequest);
        } catch (e) {
          //FIXME: Logout and error handling
          console.error(e);
          logout();
          return Promise.reject(err);
        }
      }
      return Promise.reject(err);
    }
  );
  return axiosAdminInstance;
};
