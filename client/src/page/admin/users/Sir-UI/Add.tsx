import UserForm from "@/components/Users/UserForm";
import { useNavigate } from "react-router";

const Add = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("/admin/users");
  };
  const handleCancel = () => {
    navigate("/admin/users");
  };
  return (
    <UserForm mode="create" onSuccess={handleSuccess} onCancel={handleCancel} />
  );
};

export default Add;
