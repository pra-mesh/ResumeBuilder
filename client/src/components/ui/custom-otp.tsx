import React, { ChangeEvent, useEffect, useState } from "react";

const CustomOTP = ({
  extOtp = "",
  error,
  onChange,
}: {
  extOtp?: string;
  error?: string;
  onChange?: (otp: string) => void;
}) => {
  // const [otp, setOtp] = useState(Array(otpLength).fill("")); // for dynamic
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  useEffect(() => {
    const newOtp = extOtp?.split("").slice(0, 6) || [];

    setOtp(Array.from({ length: 6 }, (_, i) => newOtp[i] || ""));
  }, [extOtp]);
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    //Handle paste event
    if (value.length > 1) {
      const pastedValue = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        if (i < pastedValue.length) {
          newOtp[i] = pastedValue[i];
        }
      }
      setOtp(newOtp);

      onChange?.(newOtp.join(""));

      if (pastedValue.length < 6) {
        focusInput(pastedValue.length.toString());
      }
      return;
    }
    // Handle single digit input
    newOtp[index] = value;
    onChange?.(newOtp.join(""));
    setOtp(newOtp);

    // Auto-focus next input if current input is filled
    if (value && index < 5) {
      focusInput((index + 1).toString());
    }
  };
  const focusInput = (index = "0") => {
    const nextInput = document.getElementById(`otp-${index}`);
    if (nextInput) nextInput?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      focusInput((index - 1).toString());
  };

  return (
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
            const pastedData = e.clipboardData.getData("text/plain");
            handleOtpChange(0, pastedData);
          }}
          className={`h-12 w-12 rounded-md border text-center text-lg font-semibold shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default CustomOTP;
