//TODO don't make menu roles manual
import {
  File,
  FilePlus,
  GalleryHorizontal,
  LayoutDashboard,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useAuth } from "@/context/AuthContext";
const adminMenuList = [
  {
    GroupName: "Dashboard",
    icon: LayoutDashboard,
    roles: ["user", "admin"],
    menu: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    GroupName: "Resume",
    icon: File,
    roles: ["user", "admin"],
    menu: [
      {
        title: "Add Resume",
        url: "/user/resume/add",
        icon: FilePlus,
      },
      {
        title: "Resumes",
        url: "/user/resumes",
        icon: GalleryHorizontal,
      },
    ],
  },
  {
    GroupName: "User",
    icon: User,
    roles: ["admin"],
    menu: [
      {
        title: "Add User",
        url: "/admin/users/add",
        icon: UserPlus,
      },
      {
        title: "List User",
        url: "/admin/users",
        icon: Users,
      },
    ],
  },
];
const Menus = () => {
  const { user } = useAuth();
  return (
    <SidebarContent>
      {adminMenuList.map(
        (group, idx) =>
          group.roles.some((item) => user?.roles.includes(item)) &&
          (group.menu.length > 1 ? (
            <Collapsible
              defaultOpen={true}
              className="group/collapsible"
              key={idx}
            >
              <SidebarGroup className="mb-0 pb-0 pt-0">
                <CollapsibleTrigger>
                  <SidebarGroupLabel>
                    <span>{group.GroupName}</span>
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu>
                    {group.menu.map((item, idx) => (
                      <SidebarMenuItem key={idx}>
                        <SidebarMenuButton asChild>
                          <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <SidebarMenu key={idx}>
              {group.menu.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          ))
      )}
    </SidebarContent>
  );
};

export default Menus;
