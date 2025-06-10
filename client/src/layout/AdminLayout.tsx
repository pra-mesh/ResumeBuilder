import { Suspense } from "react";
import { Outlet } from "react-router";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SideBarAdmin } from "@/components/sideBar/SideMeuBar";
import { cn } from "@/lib/utils";
import { FileTextIcon } from "lucide-react";

//TODO value from outlet for header title
const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-full">
        <SideBarAdmin />
        <main className="flex-1 overflow-y-auto  mx-5">
          <div
            className={cn(
              "md:hidden flex items-center justify-between px-4 py-2 border-b",
              "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
            )}
          >
            <div className="flex items-center gap-2">
              <FileTextIcon className="h-6 w-6" />
              <span className="font-bold text-lg">Pro Resume</span>
            </div>
            {/* You can add more elements here for the mobile header if needed */}
            <SidebarTrigger />
            {/* Placeholder for right alignment if needed */}
          </div>
          {/* <Header /> */}
          <Suspense fallback={<p>Loading Page.....</p>}>
            <Outlet />
          </Suspense>
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
