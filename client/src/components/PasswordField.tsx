import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";

const PasswordField = ({
  id = "password",
  name,
  label,
  error,
  value,
  onChange,
}: {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        ></label>
      )}

      <div className="relative">
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="********"
          className={` pl-10 pr-10  ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-10 w-10"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordField;
