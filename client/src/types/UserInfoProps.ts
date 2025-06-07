export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  roles: string[];
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profilePic: string;
}

export interface profileFormProps {
  mode: "create" | "edit" | "profileUpdate";
  initialData?: UserInfo | null;
  onSuccess: () => void;
  showPasswordFields?: boolean;
  showRole?: boolean;
}
