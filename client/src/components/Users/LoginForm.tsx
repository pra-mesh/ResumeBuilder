import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@radix-ui/react-label";
import { Mail } from "lucide-react";
import PasswordField from "./PasswordField";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { URLS } from "@/constants";
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
  const { login, user } = useAuth();
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [payload, setPayload] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    setErr("");
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(URLS.Auth + "/login", payload);
      const { access_token, refresh_token, data: msg } = data;
      setMsg(msg);

      login(access_token, refresh_token);
      if (user?.roles.includes("admin")) navigate("/admin/dashboard");
      else navigate("/user");
    } catch (err: any) {
      const errMsg = err?.response?.data?.err || "Something went wrong";
      setErr(errMsg);
    } finally {
      setPayload({ email: "", password: "" });
      setTimeout(() => {
        setMsg("");
        setErr("");
      }, 10000);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Account Login</h2>
          <p className="text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>
        <div>
          {err && (
            <Alert variant="success" className="bg-red-200">
              <AlertDescription className="text-red-700 bg-red-200">
                {err}
              </AlertDescription>
            </Alert>
          )}
          {msg && (
            <Alert variant="success" className="p-0">
              <AlertDescription className="text-teal-700 bg-teal-200">
                {msg}
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="px-10  py-2  h-10 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:border-orange-500 "
                value={payload?.email}
                onChange={(e) =>
                  setPayload((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/auth/forget-password"
                state={{ email: payload.email }}
                className="text-sm text-orange-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <PasswordField
                name="password"
                icon={true}
                value={payload?.password}
                onChange={(e) =>
                  setPayload((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  })
                }
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          Sign In
        </Button>
        <div className="text-center text-sm">
          Don't have an account?
          <Link
            to="/auth/register "
            className="text-orange-600 hover:underline"
          >
            Create account
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
