import { Link } from "react-router";
import { Button } from "./ui/button";

const Header = ({ title = "APP" }) => (
  <header className="sticky top-0 z-50 px-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-15 items-center justify-between">
      <div className="font-semibold ">{title}</div>
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link to="/user/resume/add">Create Resume</Link>
        </Button>
      </div>
    </div>
  </header>
);

export default Header;
