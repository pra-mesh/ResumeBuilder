import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import Menus from "@/components/sideBar/Menu";
import { FileTextIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
export const SideBarAdmin = () => {
  const { logout, user } = useAuth();
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <FileTextIcon className="h-6 w-6" />
          <span
            className={`font-bold text-lg transition-opacity duration-200
              ${state === "collapsed" && "opacity-0 hidden"}`}
          >
            Pro Resume
          </span>
          <SidebarTrigger
            className={cn("ml-auto", state === "collapsed" && "ml-0")}
          />
        </div>
        <SidebarSeparator />
      </SidebarHeader>
      <Menus />
      <SidebarFooter>
        <div className="px-4 py-2 mb-2">
          {state !== "collapsed" && (
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          )}
        </div>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button className="w-full" onClick={logout}>
                <div className="flex items-center gap-2 px-4 py-2">
                  <LogOut className="h-6 w-6" />
                  <span
                    className={`font-bold text-lg transition-opacity duration-200
              ${state === "collapsed" && "opacity-0 hidden"}`}
                  >
                    Log out
                  </span>
                </div>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
