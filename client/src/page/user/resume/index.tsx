import { Link } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Download,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loadResumes } from "@/slices/resumeSlice";
import { Resume } from "@/types/resume";
import { formatDate } from "@/lib/dateFormatter";
import { longValue } from "@/lib/utils";

export default function Resumes() {
  const [searchQuery, setSearchQuery] = useState("");
  const { resumes, limit, currentPage, total, searchValue } = useSelector(
    (state: RootState) => state.resumes
  );
  const dispatch = useDispatch<AppDispatch>();

  const initUserFetch = useCallback(() => {
    dispatch(loadResumes({ limit, page: currentPage, title: "" }));
  }, [dispatch, limit, currentPage]);

  useEffect(() => {
    initUserFetch();
  }, [initUserFetch]);

  const filteredResumes = resumes.filter(
    (resume: Resume) =>
      resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.personalInfo.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Resumes</h1>
        <Button asChild>
          <Link to="/user/resume/add">
            <Plus className="mr-2 h-4 w-4" /> Add Resume
          </Link>
        </Button>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resumes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResumes.map((resume: Resume) => (
          <Card key={resume.id}>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>
                    {longValue({ text: resume.title, length: 35 })}
                  </CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-1 w-2 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-justify">
                {longValue({
                  text: resume.personalInfo.summary,
                  length: 100,
                })}
              </CardDescription>
              <div className="flex items-center justify-between text-sm mt-2">
                <Badge variant="outline">{resume.template}</Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {resume.status}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <div>Updated At: {formatDate(resume.updatedAt)}</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
