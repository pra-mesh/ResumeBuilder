import { UserInfo } from "./UserInfoProps";

export interface profileFormProps {
  mode: "create" | "edit";
  initialData?: UserInfo;
  onSuccess: () => void;

  showPasswordFields?: boolean;
  showRole?: boolean;
  isEditing?: boolean;
}
