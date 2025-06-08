//[ ] token validation and auth validation
//TODO HOC for component based authentication like layer

import { URLS } from "@/constants";
import { UserInfo } from "@/types/UserInfoProps";
import { decodeJWT } from "@/lib/jwt";
import { removeAllItems, setItem } from "@/lib/storage";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router";
import { persistor, resetState, store } from "@/store";

interface AuthContextProps {
  isAuthenticated: boolean;
  logout: () => void;
  login: (access: string, refresh: string) => void;
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  setRefetch: (refetch: boolean) => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem("refresh_token")
  );
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("access_token")
  );
  const [user, setUser] = useState<UserInfo | null>(null);
  const [refetch, setRefetch] = useState<boolean>(true);
  const login = async (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    setItem("access_token", access);
    setItem("refresh_token", refresh);
    setIsAuthenticated(true);
  };

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    removeAllItems();
    setIsAuthenticated(false);
    navigate("/auth/login");
    setRefetch(true);
    persistor.purge();
    store.dispatch(resetState());
  }, [navigate]);

  //NOTES Validating tokens
  useEffect(() => {
    const validateToken = async () => {
      if (!accessToken) {
        setIsAuthenticated(false);

        return;
      }
      try {
        const { exp } = decodeJWT(accessToken);
        const isExpired = exp && exp < Date.now() / 1000;
        if (!isExpired) {
          setIsAuthenticated(true);
        } else if (isExpired && refreshToken) {
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Token validation error:", error);
        logout();
      }
    };
    validateToken();
  }, [accessToken, logout, refreshToken]);
  //NOTES Fetching users on accessToken change
  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated || !accessToken) return;
      try {
        if (refetch) {
          //NOTES Prevent cyclic call of axios for refresh token
          const { axiosAdmin } = await import("@/lib/axiosAdmin");
          const { data } = await axiosAdmin.get(`${URLS.USERS}/profile`);
          setUser(data);
          setRefetch(false);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };
    fetchUser();
  }, [isAuthenticated, accessToken, refetch]);

  useEffect(() => {
    // if (!isInitializing && !isAuthenticated) {
    // }
  }, [navigate, isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        logout,
        login,
        accessToken,
        refreshToken,
        user,
        setRefetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be wrapped within AuthProvider");
  return context;
};
