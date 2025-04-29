/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router";

import { URLS } from "@/constants";

import { axiosInstance } from "@/lib/axios";
import { setItem } from "@/lib/storage";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: any) => {
    try {
      setErr("");
      e.preventDefault();
      const { data } = await axiosInstance.post(URLS.Auth + "/login", {
        ...payload,
      });
      const { access_token, refresh_token, data: msg } = data;
      setMsg(msg);
      setItem("access_token", access_token);
      setItem("refresh_token", refresh_token);
    } catch (err: any) {
      const errMsg = err?.response?.data?.err || "Something went wrong";
      setErr(errMsg);
    } finally {
      setPayload({
        email: "",
        password: "",
      });
      setTimeout(() => {
        setMsg("");
        setErr("");
      }, 100000);
    }
  };
  return (
    <>
      <div className="flex min-h-screen items-center justify-center overflow-hidden rounded-lg bg-white shadow">
        <Card className="w-full max-w-4xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column - Branding */}
            <div className="bg-gradient-to-br from-orange-600 to-yellow-100 p-8 text-white flex flex-col justify-center items-center">
              <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold">
                  Welcome to Resume Builder
                </h1>
                <p className="text-purple-100">
                  Sign in to access your account.
                </p>
                <div className="py-8">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Login illustration"
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Login Form */}
            <CardContent className="p-8 flex items-center">
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Account Login</h2>
                  <p className="text-muted-foreground">
                    Enter your credentials to sign in
                  </p>
                </div>
                <div>
                  {err && (
                    <Alert variant="destructive" className="p-0">
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
                        className="pl-10"
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
                        className="text-sm text-orange-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        value={payload?.password}
                        onChange={(e) =>
                          setPayload((prev) => {
                            return {
                              ...prev,
                              password: e.target.value,
                            };
                          })
                        }
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-10 w-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
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
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
