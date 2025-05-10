import TableSkeleton from "@/components/TableSkeleton";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useAuth } from "@/context/AuthContext";

const Users = () => {
  const { logout } = useAuth();
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
          <div>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
