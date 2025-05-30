import {
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from "react";
import { Loader2, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import PasswordField from "./PasswordField";
import { cn } from "@/lib/utils";
import { profileFormProps } from "@/interface/profileFormProps";
import { useNavigate } from "react-router";

const ROLES = ["admin", "user"];
const GENDERS = ["Male", "Female", "Other"];
const UserAddEditForm = ({
  initialData,
  onSubmit,
  isLoading,
  isEditing = false,
  serverError,
  serverMessage,
  showPasswordFields = true,
  showRole = false,
}: profileFormProps) => {
  const [profilePreview, setProfilePreview] = useState<string | null>(
    initialData?.profilePic ? `/assets${initialData.profilePic}` : null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [roles, setRoles] = useState<string[]>(
    initialData?.roles ? initialData.roles : []
  );
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRoles((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
  const handleFormValidation = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    if (showPasswordFields) {
      if (formData.get("password") !== formData.get("confirmPassword")) {
        newErrors.password = "Password not matched.";
        newErrors.confirmPassword = "Password not matched.";
      } else if (
        formData.get("password") &&
        formData.get("password")!.toString().length < 6
      ) {
        newErrors.password =
          "Password must be at least 6 characters if provided.";
      }
    }
    if (!formData.get("email") && !isEditing)
      newErrors.email = "Email is required";
    if (!formData.get("name")) newErrors.name = "Name is required";
    if (showRole && roles.length < 1)
      newErrors.roles = "At least on role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      if (!handleFormValidation(formData)) return;
      const fileInput = fileInputRef.current?.files?.[0];
      if (fileInput) {
        formData.append("picture", fileInput);
      }
      if (showRole) roles.forEach((role) => formData.append("roles[]", role));
      formData.delete("confirmPassword");
      onSubmit(formData);
      setTimeout(() => {
        formRef.current?.reset();
        setProfilePreview(null);
        setRoles([]);
        setErrors({});
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 4000);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      const timeout = setTimeout(() => {
        setErrors({});
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, [errors]);
  useEffect(() => {
    if (isEditing && !initialData) navigate("/admin/users");
    //BUG How to fix on refresh if data changes navigate to other page or we can persist data.
  }, [navigate, initialData, isEditing]);
  return (
    <form onSubmit={handleSubmit} ref={formRef} className="space-y-5">
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
            defaultValue={initialData?.name || ""}
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
            defaultValue={initialData?.email || ""}
            className={`w-full rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } disabled:bg-gray-200 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
            disabled={isEditing}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>
      {/* Password */}
      {showPasswordFields && (
        <>
          <PasswordField
            name="password"
            icon={false}
            label="Password"
            error={errors.password}
          />
          {/* Confirm Password */}
          <PasswordField
            name="confirmPassword"
            id="confirmPassword"
            icon={false}
            label="Confirm Password"
            error={errors.confirmPassword}
          />
        </>
      )}
      {/* Roles */}
      {showRole && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Roles
          </label>
          <div
            className={cn(
              "mt-2 rounded-md border  py-2  px-3 flex space-x-6",
              errors.roles ? "border-red-500" : "border-gray-300"
            )}
          >
            {ROLES.map((role) => (
              <div className="flex items-center" key={role}>
                <input
                  type="checkbox"
                  id={role}
                  value={role}
                  defaultChecked={initialData?.roles.includes(role)}
                  onChange={handleRoleChange}
                  className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label
                  htmlFor={role}
                  className="ml-2 block text-sm text-gray-700 capitalize"
                >
                  {role}
                </label>
              </div>
            ))}
          </div>
          {errors.roles && (
            <p className="mt-1 text-sm text-red-500">{errors.roles}</p>
          )}
        </div>
      )}
      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <div className="mt-2 flex space-x-6">
          {GENDERS.map((gender) => (
            <div key={gender} className="flex items-center">
              <input
                id={gender}
                name="gender"
                type="radio"
                defaultChecked={
                  initialData?.gender === gender[0].toLocaleLowerCase()
                }
                value={gender[0].toLocaleLowerCase()}
                className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label
                htmlFor={gender}
                className="ml-2 block text-sm text-gray-700"
              >
                {gender}
              </label>
            </div>
          ))}
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
        )}
      </div>
      <div className="space-y-4">
        {serverError && (
          <Alert variant="destructive" className="border-red-200 bg-red-50 p-0">
            <AlertDescription className="text-red-700">
              {serverError}
            </AlertDescription>
          </Alert>
        )}
        {serverMessage && (
          <Alert variant="success" className="border-green-200 bg-green-50 p-0">
            <AlertDescription className="text-green-700">
              {serverMessage}
            </AlertDescription>
          </Alert>
        )}
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};
export default UserAddEditForm;
