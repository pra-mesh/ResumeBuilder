import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SideBarAdmin } from "@/components/sideBar/SideMeuBar";

//TODO value from outlet for header title
const AdminLayout = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <SideBarAdmin />
        <main className="flex-1 overflow-y-auto  mx-5">
          <Header />
          <Suspense fallback={<p>Loading Page.....</p>}>
            <Outlet />
          </Suspense>
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default AdminLayout;
