import { createUserFormData, updateUserFormData } from "@/services/users";
import { User } from "@/types/UserProps";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const updateUserByID = async (payload: {
  id: string;
  formData: FormData;
}): Promise<User> => {
  const user = await updateUserFormData(payload.id, payload.formData);
  return user;
};
const createUser = async (userData: FormData) => {
  const user = await createUserFormData(userData);
  return user;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserByID,
    onSuccess: (updatedUser) => {
      // NOTES Update the specific user in cache
      queryClient.setQueryData(["users", updatedUser._id], updatedUser);
      // NOTES Invalidate users list to ensure consistency
      queryClient.refetchQueries({ queryKey: ["users"] });
    },
  });
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
