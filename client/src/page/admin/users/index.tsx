import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Plus, Eye, FileSpreadsheet } from "lucide-react";

import { DataTableIntegrated } from "@/components/ui/data-table-integrated";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  getAllUsers,
  setLimit,
  setCurrentPage,
  setSearch,
} from "@/slices/userSlice";
import { AppDispatch } from "@/store";
import { formatDate } from "@/lib/dateFormatter";
import { ButtonGroup } from "@/components/ui/button-group";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";
import { autoTable } from "jspdf-autotable";
import { jsPDF } from "jspdf";
import UsersDataColumns from "./userDataColumns";

// Sample user data

export default function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, limit, currentPage, total, searchValue } = useSelector(
    (state: any) => state.users
  );
  const debouncedSearch = useDebounce(searchValue, 1500);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const columns = UsersDataColumns();

  const changePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };
  const changeLimit = (value: number) => {
    dispatch(setLimit(value));
  };
  //NOTES Redux fetch without tanstack query
  const initUserFetch = useCallback(() => {
    dispatch(fetchUsers({ limit, page: currentPage, name: debouncedSearch }));
  }, [dispatch, limit, currentPage, debouncedSearch]);

  //Browser current page and limit update
  useEffect(() => {
    if (
      searchParams.get("limit") ||
      searchParams.get("page") ||
      searchParams.get("name")
    ) {
      const nameParm = searchParams.get("name") || "";
      setSearch(nameParm);
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
      name: searchValue ?? debouncedSearch,
    });
    navigate(`?${query.toString()}`, { replace: true });
  }, [currentPage, limit, navigate, debouncedSearch, searchValue]);
  useEffect(() => {
    initUserFetch();
  }, [initUserFetch]);

  //TODO how to use tanstack and redux toolkit combined

  //TODO use Memo
  //TODO Implement Separation of concern (Dry)
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
