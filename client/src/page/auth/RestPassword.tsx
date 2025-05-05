import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { URLS } from "@/constants";

const ResetPassword = () => {
  // In a real app, you would get this email from your auth context or URL params
  const [email, setEmail] = useState("");
  const [codeText, setCodeText] = useState("Send Code");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isReset, setIsReset] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

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

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate OTP
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      newErrors.otp = "Please enter all 6 digits of the verification code";
    }

    // Validate password
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
   
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // This is where you would typically call your password reset API
      console.log(
        "Resetting password with OTP:",
        otp.join(""),
        "New password:",
        newPassword
      );
      const token = otp.join("");

      const { data } = await axiosInstance.post(
        `${URLS.Auth}/forget-password/rest-password`,
        {
          email,
          otp: token,
          password: newPassword,
        }
      );
      console.log(data);
      // Show success message
      if (data) setIsReset(true);
    } catch (err) {
      setErrors({ form: "Failed to reset password. Please try again." });
      console.error("Password reset failed:", err);
    } finally {
      console.log("Do something");
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    const newErrors: Record<string, string> = {};
    if (resendDisabled) return;

    try {
      const isEmailValid = /\S+@\S+\.\S+/.test(email);
      if (!isEmailValid) {
        newErrors.email = "Invalid Email";
        setErrors(newErrors);
        console.log(newErrors.email);
        return;
      }
      setResendDisabled(true);
      setResendTimer(30);
      // Simulate API call
      await axiosInstance.post(`${URLS.Auth}/forget-password`, { email });
      setCodeText("Code Sent");
      setTimeout(() => {
        setCodeText("Resend Code");
      }, 15000);

      setErrors(newErrors);
    } catch (err) {
      setErrors({ form: "Failed to resend code. Please try again." });
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
          Reset Your Password
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter the verification code sent to your email and create a new
          password
        </p>

        <div className="overflow-hidden rounded-lg bg-white p-8 shadow">
          {!isReset ? (
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
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-md border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
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
                      className={`h-12 w-12 rounded-md border text-center text-lg font-semibold shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.otp ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-500">{errors.otp}</p>
                )}

                <div className="mt-2 text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendDisabled}
                    className={`text-sm font-medium ${
                      resendDisabled
                        ? "text-gray-400"
                        : "text-blue-600 hover:text-blue-500"
                    }`}
                  >
                    {resendDisabled ? `Resend in ${resendTimer}s` : codeText}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full rounded-md border ${
                      errors.newPassword ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.newPassword}
                  </p>
                )}
                <div className="mt-1">
                  <p className="text-xs text-gray-500">Password must:</p>
                  <ul className="ml-4 list-disc text-xs text-gray-500">
                    <li
                      className={
                        newPassword.length >= 8 ? "text-green-500" : ""
                      }
                    >
                      Be at least 8 characters long
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(newPassword) ? "text-green-500" : ""
                      }
                    >
                      Include at least one uppercase letter
                    </li>
                    <li
                      className={
                        /[a-z]/.test(newPassword) ? "text-green-500" : ""
                      }
                    >
                      Include at least one lowercase letter
                    </li>
                    <li
                      className={
                        /[0-9]/.test(newPassword) ? "text-green-500" : ""
                      }
                    >
                      Include at least one number
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full rounded-md border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } px-3 py-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {errors.form && (
                <p className="text-center text-sm text-red-500">
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Reset Password
              </button>
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
                Password Reset Successfully
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Your password has been reset successfully. You can now log in
                with your new password.
              </p>
              <button
                type="button"
                onClick={() => navigate("auth/login")}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
