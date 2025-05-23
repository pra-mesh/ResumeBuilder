import TableSkeleton from "@/components/TableSkeleton";
import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosAdmin.get(URLS.USERS);
      return data.data;
    },
  });
  if (isError) {
    throw new Error(error.message);
  }
  return (
    <div>
      {isLoading ? (
        <>
          <TableSkeleton />
        </>
      ) : (
        <div>
          <ul>
            {data.map((user: any) => (
              <li key={user?._id}>{user?.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Users;
