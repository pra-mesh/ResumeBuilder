import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import Menus from "@/components/sideBar/Menu";
import { FileTextIcon, LogOut } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      </SidebarHeader>
      <Menus />

      <SidebarFooter className="p-4">
        <div
          className={cn(
            "flex flex-col gap-4",
            state === "collapsed" && "items-center"
          )}
        >
          {/* Separator */}
          <div className="h-px bg-border w-full" />

          {/* User profile section */}
          <div
            className={cn(
              "flex items-center gap-3",
              state === "collapsed" && "flex-col"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 h-auto rounded-full"
                  aria-label="User menu"
                >
                  <Avatar
                    className={cn(
                      "h-9 w-9 cursor-pointer rounded-full",
                      state === "collapsed" ? "mx-auto" : ""
                    )}
                  >
                    <AvatarImage
                      src={`/assets${user?.profilePic}`}
                      alt="User avatar"
                    />
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {state !== "collapsed" && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
