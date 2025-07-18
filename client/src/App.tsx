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
import EditUser from "./page/admin/users/EditUser";
import Register from "@/page/auth/register";
import ForgotPassword from "@/page/auth/ForgetPassword";
import EmailVerification from "@/page/auth/EmailVerification";
import ResetPassword from "@/page/auth/RestPassword";
import NotFound from "./Error";
import EditResume from "./page/user/resume/EditResume";
import PrintResume from "./page/user/resume/PrintResume";
import { Helmet } from "react-helmet-async";
//import Edit from "@/page/admin/users/Edit";

const Dashboard = lazy(() => import("@/page/admin/Dashboard"));
const App = () => {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Build your Resume" />
        <meta
          property="og:description"
          content="If you want to build simple and "
        />
        <meta
          property="og:url"
          content="https://resumebuilder.pradhanpramesh.com.np/"
        />
        <meta property="og:type" content="Productivity" />
        <meta
          property="og:image"
          content="https://resumebuilder.pradhanpramesh.com.np/hero-section.png"
        />
        <meta property="og:type" content="website" />
      </Helmet>
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
          <Route path="users/:id" element={<EditUser />} />
        </Route>

        <Route path="/user" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="resumes" element={<Resumes />} />
          <Route path="resume/add" element={<AddResume />} />
          <Route path="resume/:id" element={<EditResume />} />
          <Route path="resume/print/:id" element={<PrintResume />} />
        </Route>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors closeButton position="top-right" />
    </>
  );
};

export default App;
