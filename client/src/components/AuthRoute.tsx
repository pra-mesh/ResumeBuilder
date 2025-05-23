//BUG When refresh an admin user is redirected to dashboard
import { Navigate } from "react-router";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <div>{children}</div>;
};

export default AuthRoute;
