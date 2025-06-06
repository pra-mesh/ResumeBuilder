import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";

import { fetchUser } from "@/services/users";
import { User } from "@/types/UserProps";

import UserForm from "@/components/Users/UserForm";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const fetchUserByID = async (id: string): Promise<User> => {
  const data = await fetchUser(id);
  console.log(data);
  return data;
};
const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserByID(id as string),
    enabled: !!id,
  });
  const handleSuccess = () => {
    navigate("/admin/users");
  };
  const handleCancel = () => {
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
    <UserForm
      mode="edit"
      onSuccess={handleSuccess}
      user={user}
      onCancel={handleCancel}
    />
  );
};

export default Edit;
