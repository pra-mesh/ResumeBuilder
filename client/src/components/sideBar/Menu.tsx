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
const adminMenuList = [
  {
    GroupName: "Dashboard",
    icon: LayoutDashboard,
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
    menu: [
      {
        title: "Add Resume",
        url: "/admin/resume/add",
        icon: FilePlus,
      },
      {
        title: "Resumes",
        url: "/admin/resumes",
        icon: GalleryHorizontal,
      },
    ],
  },
  {
    GroupName: "User",
    icon: User,
    menu: [
      {
        title: "Add User",
        url: "#",
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
  return (
    <SidebarContent>
      {adminMenuList.map((group, idx) =>
        group.menu.length > 1 ? (
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
        )
      )}
    </SidebarContent>
  );
};

export default Menus;
