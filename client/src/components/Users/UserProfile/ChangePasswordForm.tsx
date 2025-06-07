import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { URLS } from "@/constants";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import PasswordField from "../PasswordField";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "../../ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/lib/validation/changePassword";
import { DialogOpenClose } from "@/types/openCloseDialog";

type ChangePassword = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePasswordForm = ({
  openCloseDialog,
  setOpenCloseDialog,
}: DialogOpenClose) => {
  const defaultValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const { user } = useAuth();
  const { handleSubmit, control, reset } = useForm<ChangePassword>({
    defaultValues,
    resolver: zodResolver(passwordSchema as any),
  });
  const onsubmit = handleSubmit(
    async (data: Omit<ChangePassword, "confirmPassword">) => {
      try {
        await axiosAdmin.post(`${URLS.USERS}/change-password`, data);
        toast.success("Password  changed", {
          description: "Password Changed successfully",
        });
        setTimeout(() => {
          reset(defaultValues);
          setOpenCloseDialog(false);
        }, 4000);
      } catch (e) {
        console.error({ error: e });
        toast.error("Password not changed", {
          description: "Failed to change new password",
        });
      }
    }
  );
  return (
    <div>
      <Dialog open={openCloseDialog} onOpenChange={setOpenCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Change Password</DialogTitle>
            <DialogDescription className="text-center">
              Enter current and new password
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form onSubmit={onsubmit}>
              <div className="space-y-2 mb-4">
                <label htmlFor="userEmail" className="text-sm  text-gray-700">
                  Email
                </label>
                <input
                  id="userEmail"
                  value={user?.email}
                  className={`w-full rounded-md border px-3 py-2 shadow-sm bg-muted`}
                  disabled
                />
              </div>
              <div className="space-y-2 mb4">
                <label htmlFor="oldPassword" className="text-sm  text-gray-700">
                  Current Password
                </label>
                <Controller
                  name="oldPassword"
                  control={control}
                  render={({ field }) => (
                    <PasswordField
                      id="oldPassword"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                ></Controller>
              </div>
              <div className="space-y-2 mb4">
                <label htmlFor="Password" className="text-sm  text-gray-700">
                  New Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <PasswordField
                      id="Password"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                ></Controller>
              </div>
              <div className="space-y-2 mb4">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm  text-gray-700"
                >
                  Confirm Password
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <PasswordField
                      id="confirmPassword"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                ></Controller>
              </div>
              <Button type="submit" className="mx-auto mt-4 block">
                Change Password
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePasswordForm;
