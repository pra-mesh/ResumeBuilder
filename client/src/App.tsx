import { Route, Routes } from "react-router";
import Login from "@/page/auth/login";
import Register from "@/page/auth/register";
import NotFound from "./Error";
import ForgotPassword from "@/page/auth/ForgetPassword";
import EmailVerification from "@/page/auth/EmailVerification";
import ResetPassword from "@/page/auth/RestPassword";
import { lazy } from "react";
import Home from "@/page/Home";
import AdminLayout from "@/layout/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import AddResume from "@/page/user/resume/AddResume";
import AdminUsers from "./page/admin/users";
import { Resumes } from "./page/user/resume";
import { Toaster } from "sonner";

const Dashboard = lazy(() => import("@/page/admin/Dashboard"));
const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Routes>
        {!isAuthenticated && (
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forget-password" element={<ForgotPassword />} />
            <Route path="Email-Verify" element={<EmailVerification />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        )}
        {/* Admin */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="resumes" element={<Resumes />} />
          <Route path="resume/add" element={<AddResume />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors closeButton position="bottom-right" />
    </>
  );
};

export default App;
