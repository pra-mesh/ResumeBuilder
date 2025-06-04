export type Role = "admin" | "user";

export type User = {
  _id?: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  gender?: string;
  password?: string;
  roles: Role[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  profilePic?: string;
};

export interface UserFormProps {
  mode: "create" | "edit";
  user?: User;
  onSuccess?: () => void;
  onCancel?: () => void;
}
