import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { UserInfo } from "@/interface/UserInfoProps";
import { formatDate } from "@/lib/dateFormatter";
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";
import { Eye, LockIcon, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setSelectedUser, blockUser } from "@/slices/userSlice";
const UsersDataColumns = (): ColumnDef<UserInfo>[] => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleViewUser = (user: UserInfo) => {
    toast(`Viewing ${user.name}'s profile`, {
      description: "User details loaded successfully",
      icon: <Eye className="h-4 w-4" />,
    });
  };

  const handleEditUser = (user: UserInfo) => {
    dispatch(setSelectedUser(user));
    navigate(`/admin/users/${user._id}`);
  };

  const handleBlockUser = (user: UserInfo) => {
    const status = user?.isBlocked ? "unblocked" : "blocked";
    dispatch(blockUser({ id: user?._id, isBlocked: status }));
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

  return [
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
      accessorKey: "gender",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
      cell: ({ row }) => {
        const genderInitial = row.getValue("gender");
        const gender =
          genderInitial === "m"
            ? "Male"
            : genderInitial === "f"
            ? "Female"
            : "Other";
        return <div>{gender}</div>;
      },
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
};

export default UsersDataColumns;
