import type React from "react";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import {  useLocation, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

const EmailVerification = () => {
  const {state} = useLocation()
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const email = state?.email
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];

    // Handle paste event (if user pastes a 6-digit code)
    if (value.length > 1) {
      const pastedValue = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        if (i < pastedValue.length) {
          newOtp[i] = pastedValue[i];
        }
      }
      setOtp(newOtp);
      return;
    }

    // Handle single digit input
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current input is filled
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle key down event for backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate OTP
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits of the verification code");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // This is where you would typically call your verification API
      console.log("Verifying email with OTP:", otpValue);

      // Show success message
      setIsVerified(true);

      // In a real app, you would redirect to the next step after verification
      // setTimeout(() => navigate("/dashboard"), 2000)
    } catch (err) {
      setError("Invalid verification code. Please try again.");
      console.error("Email verification failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setResendTimer(30); // 30 seconds cooldown

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // This is where you would typically call your resend OTP API
      console.log("Resending OTP to:", email);
    } catch (err) {
      console.error("Failed to resend OTP:", err);
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

                <div className="flex justify-between space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleOtpChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pastedData =
                          e.clipboardData.getData("text/plain");
                        handleOtpChange(0, pastedData);
                      }}
                      className={`h-12 w-12 rounded-md border text-center text-lg font-semibold shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isLoading}
                    />
                  ))}
                </div>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Verify Email"
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?{" "}
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
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Continue to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
