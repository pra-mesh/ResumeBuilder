import { RootState } from "@/store";
import { Resume } from "@/types/resume";
import { createSelector } from "@reduxjs/toolkit";
/* 
This file can be inside slice
Use createSelector for memoization → Prevents unnecessary recalculations.
Avoid storing filteredResume in Redux state → Compute it dynamically.
Use useSelector(selectFilteredResumes) in components
Ensures efficient rendering.
*/
const selectResumeState = (state: RootState) => state.resumes;
export const selectPaginatedResumes = createSelector(
  selectResumeState,
  ({ resumes, currentPage, limit, searchValue }) => {
    const filtered = resumes.filter(
      (resume: Resume) =>
        resume.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        resume.personalInfo.fullName
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    );
    const start = (currentPage - 1) * limit;
    const paginatedResume = filtered.slice(start, start + limit);
    const totalFiltered = filtered.length;
    return {
      paginatedResume,
      totalPage: Math.ceil(totalFiltered / limit),
    };
  }
);
export const selectResumeByID = (id: string) =>
  createSelector(selectResumeState, ({ resumes }) => {
    console.log({ resumes });
    const resume = resumes.find((resume: Resume) => resume.id === id);
    return resume;
  });
