import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import Home from "@/page/Home";
interface PrivateRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}
const PrivateComponents = ({
  children,
  adminOnly = false,
}: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user === null) {
    return <Home />;
  }
  if (isAuthenticated && user && adminOnly && !user?.roles.includes("admin"))
    return <></>;

  return <div>{children}</div>;
};

export default PrivateComponents;
