import { Navigate } from "react-router";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
interface PrivateRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}
const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  if (user && adminOnly && !user?.roles.includes("admin")) {
    console.log({ adminOnly });
    return <Navigate to="/user" replace />;
  } else if (user && !adminOnly) {
    console.log("");
    return <Navigate to="/user" replace />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
