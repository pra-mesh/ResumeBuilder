import UserAddEditForm from "@/components/Users/UserAddEditForm";

import { useNavigate } from "react-router";

const AddNewUser = () => {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    navigate("/admin/users");
  };

  return (
    <div className="flex flex-col justify-center max-w-md m-auto  pt-2 pb-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Add User</h1>
      </div>
      <UserAddEditForm
        mode="create"
        onSuccess={handleSubmit}
        showPasswordFields={false}
        showRole={true}
      />
    </div>
  );
};

export default AddNewUser;
