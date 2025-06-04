import { Toaster } from "sonner";
import { Route, Routes } from "react-router";

import { lazy } from "react";

import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "./layout/AuthLayout";

import AuthRoute from "@/components/AuthRoute";
import PrivateRoute from "./components/PrivateRoute";
import RouteWatcher from "@/components/RouteWatcher";

import Resumes from "./page/user/resume";
import Home from "@/page/Home";
import Login from "@/page/auth/login";
import AddResume from "@/page/user/resume/AddResume";
import AdminUsers from "./page/admin/users";
import AddNewUser from "./page/admin/users/AddNewUser";
//import EditUser from "./page/admin/users/EditUser";
import Register from "@/page/auth/register";
import ForgotPassword from "@/page/auth/ForgetPassword";
import EmailVerification from "@/page/auth/EmailVerification";
import ResetPassword from "@/page/auth/RestPassword";
import NotFound from "./Error";
import Edit from "@/page/admin/users/Edit";

const Dashboard = lazy(() => import("@/page/admin/Dashboard"));
const App = () => {
  return (
    <>
      <RouteWatcher />
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
          <Route path="users/:id" element={<Edit />} />
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
