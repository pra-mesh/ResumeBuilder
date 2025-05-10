//[ ] token validation and auth validation
import { removeItem, setItem } from "@/lib/storage";
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
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem("refresh_token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("access_token")
  );
  const navigate = useNavigate();
  const login = (access: string | null, refresh: string | null) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    if (access && refresh) {
      setItem("access_token", access);
      setItem("refresh_token", refresh);
      setIsAuthenticated(true);
    }
  };
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    removeItem("access_token");
    removeItem("refresh_token");
    setIsAuthenticated(false);
  };
  useEffect(() => {
    if (!isAuthenticated) navigate("/auth/login");
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
