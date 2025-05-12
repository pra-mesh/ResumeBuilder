import { SidebarTrigger } from "./ui/sidebar";

const Header = ({ title = "APP" }) =>
  <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
    <SidebarTrigger />
    <div className="font-semibold">{title}</div>
  </header>;


export default Header;
