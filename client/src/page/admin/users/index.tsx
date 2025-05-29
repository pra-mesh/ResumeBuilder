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
  getAllUsers,
  setLimit,
  setCurrentPage,
  setSearch,
  blockUser,
  setSelectedUser,
} from "@/slices/userSlice";
import { AppDispatch } from "@/store";
import { formatDate } from "@/lib/dateFormatter";
import { ButtonGroup } from "@/components/ui/button-group";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";
import { autoTable } from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { UserInfo } from "@/interface/UserInfoProps";

// Sample user data

export default function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, limit, currentPage, total, searchValue } = useSelector(
    (state: any) => state.users
  );
  const searchDebounce = useDebounce(searchValue, 1500);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const columns: ColumnDef<UserInfo>[] = [
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
  const changePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };
  const changeLimit = (value: number) => {
    dispatch(setLimit(value));
  };
  //NOTES Redux fetch without tanstack query
  const initUserFetch = useCallback(() => {
    dispatch(fetchUsers({ limit, page: currentPage, name: searchDebounce }));
  }, [dispatch, limit, currentPage, searchDebounce]);

  //Browser current page and limit udate
  useEffect(() => {
    if (searchParams.get("limit") || searchParams.get("page")) {
      const limitParam = parseInt(searchParams.get("limit") || "10");
      const pageParam = parseInt(searchParams.get("page") || "1");
      dispatch(setCurrentPage(pageParam));
      dispatch(setLimit(limitParam));
    }
  }, [dispatch, searchParams]);
  //URL update
  useEffect(() => {
    const query = new URLSearchParams({
      page: currentPage.toString(),
      limit: limit.toString(),
    });
    navigate(`?${query.toString()}`, { replace: true });
  }, [currentPage, limit, navigate]);
  useEffect(() => {
    initUserFetch();
  }, [initUserFetch]);

  //TODO how to use tanstack and redux toolkit combined

  //TODO use Memo
  const handleExportToPDF = async () => {
    const data = await dispatch(getAllUsers());
    if (data.payload.length > 0) {
      toast.success(`Report Generate Successfully`, {
        description: "Report Generated. User list is downloading.",
        icon: <Eye className="h-4 w-4" />,
      });
      const doc = new jsPDF();

      doc.text("User Data Report", 14, 15);
      autoTable(doc, {
        startY: 20,
        head: [["Name", "Email", "Roles", "Blocked", "Created On"]],
        body: [
          ...data.payload.map((user: any) => [
            user?.name,
            user?.email,
            user?.roles.toString(),
            user?.isBlocked ? "Blocked" : "Active",
            formatDate(user?.createdAt),
          ]),
          ["Total Users", "", "", "", total],
        ],
        styles: {
          fontSize: 10,
          lineWidth: 0.2, // Border thickness
          lineColor: [50, 50, 50], // Black border
        },
        headStyles: {
          fontSize: 12,
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 40 },
        },
        didParseCell: (hookData) => {
          // Apply bold styling to the footer row
          if (hookData.row.index === total) {
            hookData.cell.styles.fontStyle = "bold";
          }
        },
        // didDrawPage: (footer) => {
        //   const totalUsers = data.payload.length;
        //   doc.text(
        //     `Total Users: ${totalUsers}`,
        //     footer.settings.margin.left,
        //     doc.internal.pageSize.height - 10
        //   );
        // },
      });
      doc.save("example.pdf");
    } else {
      toast.error(`Report generation failed`, {
        description: "Data not found",
      });
    }
  };
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <ButtonGroup className="gap-2">
          <Button asChild>
            <Link to="/admin/users/add">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleExportToPDF}>
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
