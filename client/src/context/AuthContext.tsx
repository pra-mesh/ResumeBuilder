//[ ] token validation and auth validation
//BUG User not updating when access token is expired and the page is refreshed
//TODO HOC for component based authentication like layer

import { URLS } from "@/constants";
import { UserInfo } from "@/interface/UserInfoProps";
import { decodeJWT } from "@/lib/jwt";

import { removeAllItems, setItem } from "@/lib/storage";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router";

interface AuthContextProps {
  isAuthenticated: boolean;
  logout: () => void;
  login: (access: string, refresh: string) => void;
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
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
  const [isInitializing, setIsInitializing] = useState(true);

  const login = async (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    setItem("access_token", access);
    setItem("refresh_token", refresh);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    removeAllItems();
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const validateToken = async () => {
      if (!accessToken) {
        setIsAuthenticated(false);
        setIsInitializing(false);
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
      } finally {
        setIsInitializing(false);
      }
    };
    validateToken();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated || !accessToken || isInitializing) return;
      try {
        const { axiosAdmin } = await import("@/lib/axiosAdmin");
        const { data } = await axiosAdmin.get(`${URLS.USERS}/profile`);
        setUser(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };
    fetchUser();
  }, [isAuthenticated, accessToken, isInitializing]);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate("/auth/login");
    }
  }, [navigate, isAuthenticated, isInitializing]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        logout,
        login,
        accessToken,
        refreshToken,
        user,
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
