import { Card, CardContent } from "@/components/ui/card";
import UserAddEditForm from "@/components/Users/UserAddEditForm";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const UpdateProfile = () => {
  const { user } = useAuth();

  const handleSubmit = () => {
    //Close the dialog
  };
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading user...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center max-w-md m-auto  pt-2 pb-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>
      <UserAddEditForm
        mode="profileUpdate"
        initialData={user}
        onSuccess={handleSubmit}
        showPasswordFields={false}
        showRole={true}
      />
    </div>
  );
};

export default UpdateProfile;
