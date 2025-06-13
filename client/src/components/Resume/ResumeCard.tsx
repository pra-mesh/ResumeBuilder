import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { longValue } from "@/lib/utils";
import { Resume } from "@/types/resume";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Download, MoreHorizontal, PenBox, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { deleteResumeThunk } from "@/slices/resumes/resumeThunks";
import { deleteResume } from "@/slices/resumes/resumeSlice";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/dateFormatter";

const ResumeCard = ({
  resume,
  type = "draft",
}: {
  resume: Resume;
  type?: "draft" | "final";
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.resumes);

  const handleDeleteResume = async ({
    id,
    isSavedToServer,
  }: {
    id: string;
    isSavedToServer: boolean;
  }) => {
    if (isSavedToServer)
      await dispatch(deleteResumeThunk(id)); //TODO: Test it propely
    else dispatch(deleteResume(id));
    if (!loading && error) {
      toast.error("Delete failed", { description: error });
    }
    if (!loading)
      toast.success("Delete resume", { description: "Resume Deleted" });
  };

  const handleEditResume = (id: string) => {
    navigate(`/user/resume/${id}`, { state: { type } });
  };

  return (
    <div>
      <Card>
        <CardHeader>
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
                <DropdownMenuItem onClick={() => handleEditResume(resume.id)}>
                  <PenBox className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigate(`/user/resume/print/${resume.id}`, {
                      state: { type },
                    });
                  }}
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => handleDeleteResume(resume)}
                >
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
    </div>
  );
};

export default ResumeCard;
