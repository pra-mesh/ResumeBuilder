import { Link } from "react-router";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Sample resume data
const resumes = [
  {
    id: "1",
    title: "Software Engineer Resume",
    owner: "John Doe",
    template: "Modern",
    createdAt: "2023-08-15",
    updatedAt: "2023-09-02",
    downloads: 12,
  },
  {
    id: "2",
    title: "Marketing Specialist",
    owner: "Sarah Smith",
    template: "Classic",
    createdAt: "2023-07-22",
    updatedAt: "2023-07-22",
    downloads: 3,
  },
  {
    id: "3",
    title: "Product Manager",
    owner: "Michael Johnson",
    template: "Modern",
    createdAt: "2023-06-10",
    updatedAt: "2023-08-15",
    downloads: 8,
  },
  {
    id: "4",
    title: "UX Designer Portfolio",
    owner: "Emily Brown",
    template: "Minimal",
    createdAt: "2023-09-05",
    updatedAt: "2023-09-05",
    downloads: 5,
  },
  {
    id: "5",
    title: "Data Scientist Resume",
    owner: "David Wilson",
    template: "Classic",
    createdAt: "2023-05-18",
    updatedAt: "2023-07-30",
    downloads: 7,
  },
  {
    id: "6",
    title: "Frontend Developer",
    owner: "John Doe",
    template: "Minimal",
    createdAt: "2023-04-12",
    updatedAt: "2023-08-20",
    downloads: 15,
  },
];

export default function Resumes() {
  const [isAddResumeOpen, setIsAddResumeOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResumes = resumes.filter(
    (resume) =>
      resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Resumes</h1>
        <Button asChild>
          <Link to="/admin/resumes/add">
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
        {filteredResumes.map((resume) => (
          <Card key={resume.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{resume.title}</CardTitle>
                  <CardDescription>{resume.owner}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
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
              <div className="flex items-center justify-between text-sm">
                <Badge variant="outline">{resume.template}</Badge>
                <span className="text-muted-foreground">
                  {resume.downloads} downloads
                </span>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <div>
                Created: {resume.createdAt}
                {resume.updatedAt !== resume.createdAt &&
                  ` • Updated: ${resume.updatedAt}`}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
