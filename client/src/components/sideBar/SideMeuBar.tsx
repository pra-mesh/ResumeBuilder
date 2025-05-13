import {
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import AdminMenu from "@/components/sideBar/AdminMenu";
export const SideBarAdmin = () => {
  const { logout, user } = useAuth();

  return (
    <>
      <SidebarHeader>
        <div className="flex, flex-col">
          <span className="text-xl font-medium">Pro Resume AI</span>
        </div>
        <SidebarSeparator />
      </SidebarHeader>
      <AdminMenu />
      <SidebarFooter>
        <div className="px-4 py-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700 hover:text-foreground:"
                onClick={logout}
              >
                Logout
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
};
