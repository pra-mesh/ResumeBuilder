//[ ] token validation and auth validation
//BUG Refresh token is not updating the states
//TODO HOC for component based authentication like layer

import { UserInfo } from "@/interface/UserInfoProps";
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
  login: (access: string, refresh: string, user: UserInfo | null) => void;
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
  const [user, setUser] = useState<UserInfo | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as UserInfo) : null;
  });

  const login = (
    access: string | null,
    refresh: string | null,
    user: UserInfo | null
  ) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    setUser(user);

    if (access && refresh) {
      setItem("access_token", access);
      setItem("refresh_token", refresh);
      setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
    }
  };
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    removeAllItems();
    setIsAuthenticated(false);
  };
  useEffect(() => {
    // if (!isAuthenticated) navigate("/auth/login");
    //TODO: Token Validation
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
