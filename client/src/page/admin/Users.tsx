import TableSkeleton from "@/components/TableSkeleton";
import { useAdminQuery } from "@/hooks/useAdminQuery";

const Users = () => {
  const { data, isLoading, isError, error } = useAdminQuery();
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
