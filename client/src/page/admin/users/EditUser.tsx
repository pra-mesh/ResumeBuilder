import UserAddEditForm from "@/components/Users/UserAddEditForm";

import { Link, useNavigate, useParams } from "react-router";
import { fetchUserInfo } from "@/services/users";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "@/types/UserInfoProps";

const fetchUserByID = async (id: string): Promise<UserInfo> => {
  const data = await fetchUserInfo(id);
  console.log(data);
  return data;
};

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserByID(id as string),
    enabled: !!id,
  });

  const handleSubmit = () => {
    navigate("/admin/users");
  };
  if (isLoading) {
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
  if (error || !user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-destructive">Failed to load user data.</p>
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to="/admin/users"
              replace
            >
              Back to user List
            </Link>
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
        mode="edit"
        initialData={user}
        onSuccess={handleSubmit}
        isEditing={true}
        showPasswordFields={false}
        showRole={true}
      />
    </div>
  );
};

export default EditUser;
