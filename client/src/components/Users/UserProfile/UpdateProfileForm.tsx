import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogOpenClose } from "@/types/openCloseDialog";
import UserAddEditForm from "../UserAddEditForm";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const UpdateProfileForm = ({
  openCloseDialog,
  setOpenCloseDialog,
}: DialogOpenClose) => {
  const { user, setRefetch } = useAuth();
  if (!user && openCloseDialog) {
    setOpenCloseDialog(false);
    toast.info("Invalid User");
    return;
  }
  return (
    <Dialog open={openCloseDialog} onOpenChange={setOpenCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">User Profile</DialogTitle>
          <DialogDescription className="text-center">
            Pro Resume Profile
          </DialogDescription>
        </DialogHeader>
        <UserAddEditForm
          mode="profileUpdate"
          initialData={user}
          onSuccess={() => {
            setOpenCloseDialog(!openCloseDialog);
            setRefetch(true);
          }}
          showPasswordFields={false}
          showRole={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileForm;
