import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { URLS } from "@/constants";
import { axiosInstance } from "@/lib/axios";
import { AlertCircle, Mail } from "lucide-react";

import { useState, useEffect, type FormEvent } from "react";
import { Link, useLocation } from "react-router";

const EmailVerification = () => {
  const { state } = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [isVerified, setIsVerified] = useState(false);

  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const email = state?.email;

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        email,
        otp,
      };
      await axiosInstance.post(`${URLS.Auth}/email/verify`, payload);
      setIsVerified(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Invalid verification code. Please try again.");
      console.error("Email verification failed:", err?.response?.data?.err);
    } finally {
      setTimeout(() => {
        setOtp("");
        setError("");
      }, 5000);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendDisabled) return;
    setResendDisabled(true);
    setResendTimer(30); // 30 seconds cooldown
    try {
      await axiosInstance.post(`${URLS.Auth}/email/resend`, { email });
      setError("Verification code has been sent");
    } catch (err) {
      console.error("Failed to resend OTP:", err);
      setError("Failed to resend OTP:");
    } finally {
      setTimeout(() => {
        setError("");
      }, 15000);
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendTimer]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Verify Your Email
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          We've sent a verification code to your email address
        </p>

        <div className="overflow-hidden rounded-lg bg-white p-8 shadow">
          {!isVerified ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 shadow-sm"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="otp-0"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <p className="mb-3 text-xs text-gray-500">
                  Enter the 6-digit code sent to your email
                </p>

                <div className="flex justify-center items-center space-x-2 ">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup className=" rounded-none">
                      <InputOTPSlot index={0} className="rounded-none" />
                      <InputOTPSlot index={1} className="rounded-none" />
                      <InputOTPSlot index={2} className="rounded-none" />
                      <InputOTPSlot index={3} className="rounded-none" />
                      <InputOTPSlot index={4} className="rounded-none" />
                      <InputOTPSlot index={5} className="rounded-none" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
              >
                "Verify Email"
              </button>
              {error && (
                <Alert
                  variant={
                    error.includes("has been sent") ? "default" : "destructive"
                  }
                  className={
                    error.includes("has been sent")
                      ? "border-blue-200 bg-blue-50"
                      : ""
                  }
                >
                  {error.includes("has been sent") ? (
                    <Mail className="h-4 w-4 text-blue-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {error.includes("has been sent") ? "Code Sent" : "Error"}
                  </AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendDisabled}
                    className={`font-medium ${
                      resendDisabled
                        ? "text-gray-400"
                        : "text-orange-600 hover:text-orange-500"
                    }`}
                  >
                    {resendDisabled
                      ? `Resend in ${resendTimer}s`
                      : "Resend code"}
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 p-2 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Email Verified Successfully
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Your email has been verified. You can now access your account.
              </p>
              <Button
                type="button"
                asChild
                className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <Link to="/auth/login">Login to get started.</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
