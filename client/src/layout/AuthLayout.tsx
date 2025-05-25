import Footer from "@/components/Footer";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex  flex-col  min-h-screen min-w-full ">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
