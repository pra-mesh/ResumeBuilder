//[ ] token validation and auth validation
import { removeItem, setItem } from "@/lib/storage";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
interface AuthContextProps {
  isAuthenticated: boolean;
  logout: () => void;
  login: (access: string, refresh: string) => void;
  accessToken: string | null;
  refreshToken: string | null;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem("refresh_token")
  );
  const login = (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    setItem("access_token", access);
    setItem("refresh_token", access);
  };
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    removeItem("access_token");
    removeItem("refresh_token");
  };
  useEffect(() => {
    //TODO: Token Validation
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        logout,
        login,
        accessToken,
        refreshToken,
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
