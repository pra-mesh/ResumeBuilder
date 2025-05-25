import { Eye, EyeOff, Lock } from "lucide-react";
import { RefObject, useState } from "react";
import { Input } from "@/components/ui/input";

const PasswordField = ({
  id = "password",
  name,
  label,
  error,
  value,
  icon = true,
  onChange,
  inputRef,
}: {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  value?: string;
  icon?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement>;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative mt-1">
        {icon && (
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="********"
          ref={inputRef}
          className={`h-10 text-xl w-full rounded-md border px-3 py-2 shadow-sm ${
            icon ? "pl-10 pr-10" : "pr-10"
          } ${
            error ? "border-red-500" : "border-gray-300"
          } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:border-orange-500`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordField;
