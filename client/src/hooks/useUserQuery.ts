import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import {
  fetchUsers,
  fetchUserInfo,
  createUserFormData,
  updateUserFormData,
  updateUserProfile,
} from "@/services/users";
import { toast } from "sonner";
//TOLearn How to utilize userKeys
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
// TOLearn: What is and how to do optimistic tanstack update
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

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      //queryClient.setQueryData(["users", updatedUser._id], updatedUser);
      //queryClient.invalidateQueries({ queryKey: ["users"] });
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
      toast.success("User Added", {
        description: "New user has been successfully added",
      });
    },
  });
};
