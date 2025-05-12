import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <div>
      Header
      <Suspense fallback={<p>Loading Page.....</p>}>
        <Outlet />
      </Suspense>
      footer
    </div>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default AdminLayout;
