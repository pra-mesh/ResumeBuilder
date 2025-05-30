import UserAddEditForm from "@/components/Users/UserAddEditForm";
import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const EditUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedUser } = useSelector((state: any) => state.users);
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setServerError(null);
    setServerMessage(null);
    try {
      console.log(formData);

      //TODO use redux and update value of usersData;
      await axiosAdmin.put(`${URLS.USERS}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setServerMessage("User Edited");
      setTimeout(() => {
        navigate(-1);
      }, 4000);
    } catch (e: any) {
      setServerError(e?.response?.data?.err ?? "Something went wrong");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setServerError(null);
      }, 3000);
    }
  };
  useEffect(() => {
    if (!id) navigate("/admin/users");
  });
  return (
    <div className="flex flex-col justify-center max-w-md m-auto  pt-2 pb-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>
      <UserAddEditForm
        initialData={selectedUser}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isEditing={true}
        serverError={serverError}
        serverMessage={serverMessage}
        showPasswordFields={false}
        showRole={true}
      />
    </div>
  );
};

export default EditUser;
