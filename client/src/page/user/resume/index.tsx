import { Link } from "react-router";
import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Search } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setSearch } from "@/slices/resumes/resumeSlice";
import { Resume } from "@/types/resume";

import Pagination from "@/components/ui/pagination";
import { loadResumes } from "@/slices/resumes/resumeThunks";

import ResumeCard from "@/components/Resume/ResumeCard";
import { useDebounce } from "@/hooks/useDebounce";

export default function Resumes() {
  const { searchValue, limit, resumesDrafts, currentPage, resumes } =
    useSelector((state: RootState) => state.resumes);
  const debouncedSearch = useDebounce(searchValue, 1500);

  const dispatch = useDispatch<AppDispatch>();

  const initUserFetch = useCallback(async () => {
    await dispatch(
      loadResumes({ limit, page: currentPage, searchValue: debouncedSearch })
    );
  }, [currentPage, debouncedSearch, dispatch, limit]);

  useEffect(() => {
    initUserFetch();
  }, [initUserFetch]);

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          My Resumes
        </h1>
        <Button asChild>
          <Link to="/user/resume/add">
            <Plus className="mr-2 h-4 w-4" /> Add Resume
          </Link>
        </Button>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-2 text-primary">
        Unsaved Drafts
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 ">
        {resumesDrafts.map((resume: Resume) => (
          <ResumeCard resume={resume} key={resume.id} />
        ))}
      </div>
      <hr className="border-t-3 border-muted" />
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-bold tracking-tight mb-2 text-primary">
          Saved Resumes
        </h2>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resumes..."
            className="pl-8"
            value={searchValue}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume: Resume) => (
          <ResumeCard resume={resume} key={resume.id} type="final" />
        ))}
      </div>
      <div className="flex justify-end items-end">
        <Pagination />
      </div>
    </div>
  );
}
