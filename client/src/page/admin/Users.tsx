import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { URLS } from "@/constants";
import TableSkeleton from "@/components/TableSkeleton";

const fetchUsers = async () => {
  try {
    const { data } = await axiosInstance.get(URLS.USERS, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data?.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data?.err || "An error occurred");
  }
};

const Users = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  if (error) {
    throw new Error(error.message);
  }

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
