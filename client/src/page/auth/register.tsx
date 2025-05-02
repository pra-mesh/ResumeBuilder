/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Upload } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { URLS } from "@/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  const formPayloadRef = useRef<any>(null);

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const fileInputRef = useRef<any>(null);
  const navigate = useNavigate();
  // Image
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      //setProfilePicture(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const rawFormData = formPayloadRef.current;
      const fileInput = fileInputRef.current?.files[0];
      const formData = new FormData(rawFormData);
      formData.append("picture", fileInput);
      formData.delete("confirmPassword");

      const { data } = await axiosInstance.post(
        `${URLS.Auth}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMsg(data?.data);
      setTimeout(() => {
        navigate("/auth/Email-Verify", {
          state: { email: formData.get("email") },
        });
      }, 1000);
    } catch (error: any) {
      const errorMsg = error?.err || "Registration failed";
      console.error("Registration failed:", errorMsg);
      setErr(errorMsg);
    } finally {
      setTimeout(() => {
        setMsg("");
        setErr("");
        (e.target as HTMLFormElement).reset();
      }, 1000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Create an Account
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Fill in your details to get started
        </p>

        <div className="overflow-hidden rounded-lg bg-white p-8 shadow">
          <form
            onSubmit={handleSubmit}
            ref={formPayloadRef}
            className="space-y-5"
          >
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <div
                className="relative mb-2 h-24 w-24 cursor-pointer overflow-hidden rounded-full bg-gray-100"
                onClick={triggerFileInput}
              >
                {profilePreview ? (
                  <img
                    src={profilePreview || "/placeholder.svg"}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                    <Upload size={24} />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="text-sm font-medium text-orange-600 hover:text-orange-500"
              >
                {profilePreview ? "Change photo" : "Upload photo (optional)"}
              </button>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className={`w-full rounded-md border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 pr-10 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
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
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full rounded-md border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 pr-10 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
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
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-2 flex space-x-6">
                <div className="flex items-center">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    value="male"
                    className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="male"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    value="female"
                    className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="female"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="other"
                    name="gender"
                    type="radio"
                    value="other"
                    className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="other"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Other
                  </label>
                </div>
              </div>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {/* {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : ( */}
              "Create Account"
              {/* )} */}
            </button>
          </form>
          <div className="space-y-4">
            {err && (
              <>
                <Alert
                  variant="destructive"
                  className="border-red-200 bg-red-50 p-0"
                >
                  <AlertDescription className="text-red-700">
                    {err}
                  </AlertDescription>
                </Alert>
              </>
            )}
            {msg && (
              <>
                <Alert
                  variant="success"
                  className="border-green-200 bg-green-50 p-0"
                >
                  <AlertDescription className="text-green-700">
                    {msg}
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/auth/login"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
