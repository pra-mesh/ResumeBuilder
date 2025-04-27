import { Route, Routes } from "react-router";
import Login from "./page/login";
import Register from "./page/register";
import NotFound from "./page/Error";
import ForgotPassword from "./page/ForgetPassword";
import EmailVerification from "./page/EmailVerification";
import ResetPassword from "./page/RestPassword";

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
        <Route></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
