import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SideBarAdmin } from "@/components/sideBar/SideMeuBar";

//TODO value from outlet for header title
const AdminLayout = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SideBarAdmin />
      </Sidebar>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-1 p-6">
          <Suspense fallback={<p>Loading Page.....</p>}>
            <div className="flex justify-center items-start">
              <Outlet />
            </div>
          </Suspense>
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default AdminLayout;
