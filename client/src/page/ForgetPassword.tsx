import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // This is where you would typically call your password reset API
      console.log("Password reset requested for:", email);

      // Show success message
      setIsSubmitted(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Password reset request failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Forgot Password
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password
        </p>

        <div className="overflow-hidden rounded-lg bg-white p-8 shadow">
          {!isSubmitted ? (
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
                      error ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-4 rounded-full bg-green-100 p-2 text-green-600 inline-flex items-center justify-center">
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
                Check your email
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                We've sent a OTP to reset password to
                <span className="font-medium">{email}</span>
              </p>
              <p className="text-xs text-gray-500">
                If you don't see it, check your spam folder or{" "}
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-orange-600 hover:text-orange-500"
                >
                  try again
                </button>
              </p>
            </div>
          )}
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
