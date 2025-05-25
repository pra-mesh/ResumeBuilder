import UserAddEditForm from "@/components/Users/UserAddEditForm";
import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddNewUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setServerError(null); // Clear previous server error
    setServerMessage(null);
    try {
      await axiosAdmin.post(`${URLS.USERS}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setServerMessage("User Added");
      setTimeout(() => {
        navigate("/admin/users");
      }, 4000);
    } catch (e: any) {
      console.log(e.response);
      setServerError(e?.response?.data?.err ?? "Something went wrong");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setServerError(null);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-md m-auto  pt-2 pb-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Add User</h1>
      </div>
      <UserAddEditForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        serverError={serverError}
        serverMessage={serverMessage}
        showPasswordFields={false}
        showRole={true}
      />
    </div>
  );
};

export default AddNewUser;
