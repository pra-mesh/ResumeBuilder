import axios from "axios";
import { API_URL, URLS } from "@/constants";
import { decodeJWT } from "@/lib/jwt";


//NOTES We can implement the AuthBridge for whole authContext or we could introduced call-back initialization approach in authconnect
export const createAxiosAdmin = (
  getAuth: () => { accessToken: string | null; refreshToken: string | null },
  logout: () => void,
  onTokenRefresh?: (access: string, refresh: string) => void
) => {
  const axiosAdminInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
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
        } catch (e: any) {
          //FIXME: Logout and error handling
          console.error({ test: e.message });
          logout();
          return Promise.reject(err);
        }
      }
      return Promise.reject(err);
    }
  );
  return axiosAdminInstance;
};
