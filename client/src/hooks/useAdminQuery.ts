import { createAxiosAdmin } from "@/lib/createAxiosAdmin";
import { useAuth } from "@/context/AuthContext";
import { useMemo } from "react";

//FIXME  do i have create axios admin for each new hooks.
export const useAdminQuery = () => {
  const auth = useAuth();
  const axiosAdmin = useMemo(
    () =>
      createAxiosAdmin(
        () => ({
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        }),
        auth.logout,
        (newAccess, newRefresh, user) => auth.login(newAccess, newRefresh, user)
      ),
    [auth]
  );
  return axiosAdmin;
};
