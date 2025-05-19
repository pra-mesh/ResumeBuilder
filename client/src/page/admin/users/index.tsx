import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LockIcon,
  FileSpreadsheet,
} from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";
import { DataTableIntegrated } from "@/components/ui/data-table-integrated";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setLimit,
  setCurrentPage,
  setSearch,
} from "@/slices/userSlice";
import { AppDispatch } from "@/store";
import { formatDate } from "@/lib/dateFormatter";
import { ButtonGroup } from "@/components/ui/button-group";
import { Link } from "react-router";

type User = {
  id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  role: [string];
  createdAt: string;
  updatedAt: string;
};
// Sample user data

export default function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, limit, currentPage, total, searchValue } = useSelector(
    (state: any) => state.users
  );
  const handleViewUser = (user: User) => {
    toast(`Viewing ${user.name}'s profile`, {
      description: "User details loaded successfully",
      icon: <Eye className="h-4 w-4" />,
    });
  };

  const handleEditUser = (user: User) => {
    toast(`Editing ${user.name}'s profile`, {
      description: "You can now edit this user's information",
      icon: <Pencil className="h-4 w-4" />,
    });
  };

  const handleBlockUser = (user: User) => {
    const status = user?.isBlocked ? "unblocked" : "blocked";
    if (status === "blocked") {
      toast.error(`${user.name} has been ${status}`, {
        description: `User has been ${status}`,
        icon: <Trash2 className="h-4 w-4" />,
      });
    } else {
      toast.success(`${user.name} has been ${status}`, {
        description: `User has been ${status}`,
        icon: <Trash2 className="h-4 w-4" />,
      });
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "roles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const roles: any = row.getValue("roles");
        return <div>{roles.join(", ")}</div>;
      },
    },
    {
      accessorKey: "isBlocked",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Is blocked?" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("isBlocked");
        return (
          <Badge variant={status ? "destructive" : "default"}>
            {status ? "Yes" : "No"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "isEmailVerified",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email Verified" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("isEmailVerified");
        return (
          <Badge variant={status ? "default" : "destructive"}>
            {status ? "Yes" : "No"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      cell: ({ row }) => {
        const date = formatDate(row.getValue("createdAt"));
        return <div>{date}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: "View details",
              onClick: handleViewUser,
              icon: <Eye className="h-4 w-4" />,
            },
            {
              label: "Edit user",
              onClick: handleEditUser,
              icon: <Pencil className="h-4 w-4" />,
            },
            {
              label: `${row.getValue("isBlocked") ? "Unblock" : "Block"}`,
              onClick: handleBlockUser,
              icon: <LockIcon className="h-4 w-4" />,
              className: `${
                row.getValue("isBlocked")
                  ? "text-secondary"
                  : "text-destructive"
              }`,
            },
          ]}
        />
      ),
    },
  ];
  const changePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };
  const changeLimit = (value: number) => {
    dispatch(setLimit(value));
  };
  //NOTES Redux fetch without tanstack query
  const initUserFetch = useCallback(() => {
    dispatch(fetchUsers({ limit, page: currentPage, name: searchValue }));
  }, [dispatch, limit, currentPage, searchValue]);
  useEffect(() => {
    initUserFetch();
  }, [initUserFetch]);
  //TODO how to use tanstack and redux toolkit combined

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <ButtonGroup className="gap-2">
          <Button asChild>
            <Link to="admin/users/add">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              console.log("here");
            }}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export to Excel
          </Button>
        </ButtonGroup>
      </div>

      <DataTableIntegrated
        columns={columns}
        data={users}
        setPagination={changeLimit}
        setCurrentPage={changePage}
        setSearchValue={(value: string) => {
          dispatch(setSearch(value));
        }}
        limit={limit}
        page={currentPage}
        total={total}
        searchValue={searchValue}
        filterColumn="name"
        searchPlaceholder="Search users..."
      />
    </div>
  );
}
