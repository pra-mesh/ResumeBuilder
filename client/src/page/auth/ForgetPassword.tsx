import { Alert, AlertDescription } from "@/components/ui/alert";
import { forgetPassword } from "@/services/auth";
import { useEffect, useState, useTransition, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [res, setRes] = useState({ msg: "", error: "" });
  const { state } = useLocation();
  const [isPending, startTransition] = useTransition();
  const fEmail = state?.email || "";
  const navigate = useNavigate();
  useEffect(() => {
    setEmail(fEmail);
  }, [fEmail]);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setRes((prev) => {
      return { ...prev, error: "" };
    });
    // Validate email
    if (!email.trim()) {
      setRes((prev) => {
        return { ...prev, error: "Email is required" };
      });
      return;
    }
    if (!validateEmail(email)) {
      setRes((prev) => ({
        ...prev,
        error: "Please enter a valid email address",
      }));

      return;
    }
    startTransition(async () => {
      try {
        const data = await forgetPassword({ email });
        setRes((prev) => {
          return { ...prev, msg: data?.data };
        });
        setTimeout(() => {
          navigate("/auth/reset-password", { state: { email } });
        }, 2000);
      } catch (e) {
        setRes((prev) => {
          return { ...prev, error: "An error occurred. Please try again." };
        });
        console.log("Password reset request failed:", e);
      } finally {
        setTimeout(() => {
          setRes({ msg: "", error: "" });
        }, 4000);
      }
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Forgot Password
        </h1>
        <p className=" text-center text-sm text-gray-600">
          Enter your email address an OTP will be sent to your registered email
          address for password reset.
        </p>
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow mt-6">
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
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-md border ${
                    res?.error ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                />
                {res?.error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription className="text-red-700 bg-red-200">
                      {res?.error}
                    </AlertDescription>
                  </Alert>
                )}
                {res?.msg && (
                  <Alert variant="success" className="mt-4">
                    <AlertDescription className="text-teal-700 bg-teal-200">
                      {res?.msg}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? "Sending Email..." : "Send OTP"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?
          <Link
            to="/auth/login"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
