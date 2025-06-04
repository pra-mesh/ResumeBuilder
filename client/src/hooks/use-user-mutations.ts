import { User } from "@/types/UserFormProps";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/users";

const createUser = async (userData: User) => {
  return userData;
};
const updateUserByID = async (userData: User): Promise<User> => {
  const { _id, ...rest } = userData;
  const updatedUser: User = { ...rest, updatedAt: new Date().toISOString() };
  if (!_id) throw new Error("Id is required");
  const user = await updateUser(_id, updatedUser);
  return user;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // NOTES Invalidates the existing data and refetch it
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserByID,
    onSuccess: (updatedUser) => {
      // NOTES Update the specific user in cache
      queryClient.setQueryData(["users", updatedUser._id], updatedUser);
      // NOTES Invalidate users list to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
