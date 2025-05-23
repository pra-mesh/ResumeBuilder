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

const Dashboard = lazy(() => import("@/page/admin/Dashboard"));
const App = () => {
  return (
    <>
      <Routes>
        <Route path="auth">
          <Route
            path="login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />
          <Route
            path="forget-password"
            element={
              <AuthRoute>
                <ForgotPassword />
              </AuthRoute>
            }
          />
          <Route
            path="Email-Verify"
            element={
              <AuthRoute>
                <EmailVerification />
              </AuthRoute>
            }
          />
          <Route
            path="reset-password"
            element={
              <AuthRoute>
                <ResetPassword />
              </AuthRoute>
            }
          />
        </Route>

        {/* Admin */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="resumes" element={<Resumes />} />
          <Route path="resume/add" element={<AddResume />} />

          <Route
            path="users"
            element={
              <PrivateRoute adminOnly>
                <AdminUsers />
              </PrivateRoute>
            }
          />
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
