import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { URLS } from "@/constants";
import TableSkeleton from "@/components/TableSkeleton";

const fetchUsers = async () => {
  const { data } = await axiosInstance.get(URLS.USERS, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
  return data?.data;
};

const Users = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div>
      {isLoading ? (
        <>
          <TableSkeleton />
        </>
      ) : (
        <ul>
          {data.map((user: any) => (
            <li key={user?._id}>{user?.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
