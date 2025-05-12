import TableSkeleton from "@/components/TableSkeleton";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

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
            <Button type="button" onClick={logout} className="m-auto">
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
