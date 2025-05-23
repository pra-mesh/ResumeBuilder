import { Suspense } from "react";
import { Outlet } from "react-router";

import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SideBarAdmin } from "@/components/sideBar/SideMeuBar";

//TODO value from outlet for header title
const AdminLayout = () => (
  <SidebarProvider>
    <div className="flex min-h-screen min-w-full">
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
);

export default AdminLayout;
