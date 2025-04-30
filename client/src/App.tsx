import { Route, Routes } from "react-router";
import Login from "./page/auth/login";
import Register from "./page/auth/register";
import NotFound from "./Error";
import ForgotPassword from "./page/auth/ForgetPassword";
import EmailVerification from "./page/auth/EmailVerification";
import ResetPassword from "./page/auth/RestPassword";
import Dashboard from "./page/admin/Dashboard";

function App() {
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
        <Route path="/admin">
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
