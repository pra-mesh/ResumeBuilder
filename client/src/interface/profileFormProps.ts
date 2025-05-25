import { UserInfo } from "./UserInfoProps";

export interface profileFormProps {
  initialData?: UserInfo;
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
  serverError: string | null;
  serverMessage: string | null;
  showPasswordFields?: boolean;
  showRole?: boolean;
}
