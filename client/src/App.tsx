import { Navigate, Route, Routes } from "react-router";
import Login from "./page/auth/login";
import Register from "./page/auth/register";
import NotFound from "./Error";
import ForgotPassword from "./page/auth/ForgetPassword";
import EmailVerification from "./page/auth/EmailVerification";
import ResetPassword from "./page/auth/RestPassword";
import { lazy } from "react";
import Home from "./page/Home";
import AdminLayout from "@/layout/AdminLayout";
import { useAuth } from "@/context/AuthContext";
const Dashboard = lazy(() => import("@/page/admin/Dashboard"));
const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgotPassword />} />
          <Route path="Email-Verify" element={<EmailVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/">
          <Route
            index
            element={isAuthenticated ? <Navigate to="/admin" /> : <Home />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
