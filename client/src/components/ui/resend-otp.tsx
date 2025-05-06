import { forgetPassword } from "@/services/auth";
import { useEffect, useState } from "react";

const ResendOTP = ({
  email,
  onError,
}: {
  email: string;
  onError?: (error: string) => void | undefined;
}) => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const handleResendOtp = async () => {
    if (resendDisabled) return;

    try {
      const isEmailValid = /\S+@\S+\.\S+/.test(email);
      if (!isEmailValid) {
        onError?.("Invalid Email");
        return;
      }

      setResendDisabled(true);
      setResendTimer(30);
      await forgetPassword({ email: email });
      onError?.("");
    } catch (err) {
      setResendDisabled(false);
      onError?.("Failed to resend code. Please try again.");
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
    <>
      <button
        type="button"
        onClick={handleResendOtp}
        disabled={resendDisabled}
        className={`text-sm font-medium ${
          resendDisabled ? "text-gray-400" : "text-blue-600 hover:text-blue-500"
        }`}
      >
        {resendDisabled ? `Resend in ${resendTimer}s` : "Resend Code"}
      </button>
    </>
  );
};

export default ResendOTP;
