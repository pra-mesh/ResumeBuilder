import { useState, useTransition, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router";
import CustomOTP from "@/components/ui/custom-otp";
import PasswordField from "@/components/PasswordField";
import { Check } from "lucide-react";
import ResendOTP from "@/components/ui/resend-otp";
import { restPassword } from "@/services/auth";

const ResetPassword = () => {
  // In a real app, you would get this email from your auth context or URL params
  const [payload, setPayload] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isReset, setIsReset] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const { state } = useLocation();
  payload.email = state?.email;
  // Validate form
  //[ ] validate move it to its own file
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    // Validate OTP
    if (payload.otp.length !== 6) {
      newErrors.otp = "Please enter all 6 digits of the verification code";
    }

    // Validate password
    if (!payload.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (payload.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(payload.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(payload.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(payload.newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
    }

    // Validate confirm password
    if (!payload.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (payload.newPassword !== payload.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleResendOTP = (error: string) => {
    //const newErrors: Record<string, string> = {};
    if (error !== "") setErrors({ form: `${error}` });
    setPayload((prev) => ({ ...prev, otp: "" }));
  };
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (!validateForm()) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, newPassword, ...rest } = payload;
        const newPayload = { ...rest, password: newPassword };
        const { data } = await restPassword(newPayload);
        if (data) setIsReset(true);
      } catch (err) {
        setErrors({ form: "Failed to reset password. Please try again." });
        console.error("Password reset failed:", err);
      } finally {
        setTimeout(() => {
          setErrors({});
          //todo: otp is not reset
          setPayload((prev) => ({
            ...prev,
            newPassword: "",
            confirmPassword: "",
            otp: "",
          }));
        }, 4000);
      }
    });
  };

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
                    value={payload?.email}
                    disabled
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        email: e?.target?.value,
                      }))
                    }
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

                <CustomOTP
                  extOtp={payload?.otp}
                  error={errors?.otp}
                  onChange={(newOtp) =>
                    setPayload((prev) => ({ ...prev, otp: newOtp }))
                  }
                />

                {errors.otp && (
                  <p className="mt-2 text-sm text-red-500">{errors.otp}</p>
                )}

                <div className="mt-2 text-center">
                  <ResendOTP email={payload.email} onError={handleResendOTP} />
                </div>
              </div>
              <div>
                <PasswordField
                  label="New Password"
                  id="newPassword"
                  name="newPassword"
                  value={payload?.newPassword}
                  icon={false}
                  onChange={(e: any) =>
                    setPayload((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
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
                        payload?.newPassword.length >= 8 ? "text-green-500" : ""
                      }
                    >
                      Be at least 8 characters long
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(payload?.newPassword)
                          ? "text-green-500"
                          : ""
                      }
                    >
                      Include at least one uppercase letter
                    </li>
                    <li
                      className={
                        /[a-z]/.test(payload?.newPassword)
                          ? "text-green-500"
                          : ""
                      }
                    >
                      Include at least one lowercase letter
                    </li>
                    <li
                      className={
                        /[0-9]/.test(payload?.newPassword)
                          ? "text-green-500"
                          : ""
                      }
                    >
                      Include at least one number
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <PasswordField
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={payload?.confirmPassword}
                  icon={false}
                  onChange={(e: any) =>
                    setPayload((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
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
                disabled={isPending}
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isPending ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 p-2 text-green-600">
                <Check size={24} strokeWidth={1.5} />
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
                onClick={() => navigate("/auth/login")}
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
