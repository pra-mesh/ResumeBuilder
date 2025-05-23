export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  roles: [string];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
