import { useQuery } from "@tanstack/react-query";
import axiosAdminInstance from "@/lib/axiosAdmin";
import { URLS } from "@/constants";

const fetchUsers = async () => {
  const { data } = await axiosAdminInstance.get(URLS.USERS);
  return data.data;
};

export const useAdminQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
