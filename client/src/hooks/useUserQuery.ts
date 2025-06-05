import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import {
  fetchUsers,
  fetchUserInfo,
  createUserFormData,
  updateUserFormData,
} from "@/services/users";
import { toast } from "sonner";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "details"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
};
export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUserInfo(id),
    enabled: !!id,
    staleTime: 5 * 60 * 100,
  });
};
// NOTES: optimistic tanstack update
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserFormData,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users", updatedUser._id], updatedUser);
      queryClient.refetchQueries({ queryKey: ["users"] });
      toast.success("User Updated", { description: "User Edited" });
    },
  });
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserFormData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
