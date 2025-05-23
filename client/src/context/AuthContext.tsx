import { UserInfo } from "@/interface/UserInfoProps";
import { removeAllItems, setItem } from "@/lib/storage";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { URLS } from "@/constants";
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

  const axiosAdmin = useAdminQuery();

  const fetchUserProfile = async () => {
    try {
      const { data } = await axiosAdmin.get(URLS.USERS + "/profile");
      if (data) {
        const userInfo: UserInfo = {
          name: data.name,
          email: data.email,
          avatar: data.profilepic || "",
          role: data.roles,
        };
        setUser(userInfo);
        setItem("user", JSON.stringify(userInfo));
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const login = async (
    access: string | null,
    refresh: string | null,
    initialUser: UserInfo | null
  ) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    setUser(initialUser);

    if (access && refresh) {
      setItem("access_token", access);
      setItem("refresh_token", refresh);
      setItem("user", JSON.stringify(initialUser));
      setIsAuthenticated(true);
      await fetchUserProfile();
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    removeAllItems();
    setIsAuthenticated(false);
    navigate("/auth/login");
  };

  // Only fetch profile once when authenticated and user role is missing
  useEffect(() => {
    if (isAuthenticated && !user?.role) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

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