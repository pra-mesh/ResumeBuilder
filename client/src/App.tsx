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

import AddResume from "@/page/user/resume/AddResume";
import AdminUsers from "./page/admin/users";
import { Resumes } from "./page/user/resume";
import { Toaster } from "sonner";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "@/components/AuthRoute";
import AddNewUser from "./page/admin/users/AddNewUser";
import AuthLayout from "./layout/AuthLayout";

const Dashboard = lazy(() => import("@/page/admin/Dashboard"));
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="auth"
          element={
            <AuthRoute>
              <AuthLayout />
            </AuthRoute>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgotPassword />} />
          <Route path="Email-Verify" element={<EmailVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        {/* Admin */}

        <Route
          path="/admin"
          element={
            <PrivateRoute adminOnly>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/add" element={<AddNewUser />} />
        </Route>
        <Route path="/user" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="resumes" element={<Resumes />} />
          <Route path="resume/add" element={<AddResume />} />
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
