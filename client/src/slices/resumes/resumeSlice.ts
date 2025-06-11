import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resume, initialState } from "@/types/resume";
import {
  loadResumes,
  saveResumeToServer,
  updateResumeOnServer,
  deleteResumeThunk,
} from "./resumeThunks";

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  //Drafting resume to states
  reducers: {
    addOrUpdateResume(state, action: PayloadAction<Resume>) {
      const index = state.resumes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      } else {
        state.resumes.push(action.payload);
        state.total += 1;
      }
    },
    markAsSaved(state, action: PayloadAction<Resume>) {
      const resume = state.resumes.find((r) => r.id === action.payload.id);
      if (resume) resume.isSavedToServer = true;
    },
    deleteResume(state, action: PayloadAction<string>) {
      state.resumes = state.resumes.filter((r) => r.id !== action.payload);
      state.total -= 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.currentPage = 1;
    },
    setSearch: (state, action) => {
      state.currentPage = 1;
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveResumeToServer.fulfilled,
      (state, action: PayloadAction<Resume>) => {
        state.loading = false;
        const resume = state.resumes.find((r) => r.id === action.payload.id);
        if (resume) resume.id = resume._id ?? "";
      }
    );
    builder.addCase(
      saveResumeToServer.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.data;
      }
    );
    builder.addCase(saveResumeToServer.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      loadResumes.fulfilled,
      (state, action: PayloadAction<Resume[]>) => {
        const fetchedResumes = action.payload.map((resume: Resume) => ({
          ...resume,
          id: resume._id ?? "",
          isSavedToServer: true,
        }));
        //Instead of mergedResumes and uniqueResumes we could use foreach loop but this way more time and space effiecnt
        const mergedResumes = [...state.resumes, ...fetchedResumes];
        const uniqueResumes = Array.from(
          new Map(mergedResumes.map((resume) => [resume.id, resume])).values()
        );
        state.total = uniqueResumes.length;
        state.resumes = uniqueResumes;
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(loadResumes.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.data;
    });
    builder.addCase(loadResumes.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      updateResumeOnServer.fulfilled,
      (state, action: PayloadAction<Resume>) => {
        state.loading = false;
        const index = state.resumes.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.resumes[index] = action.payload;
        }
      }
    );
    builder.addCase(
      updateResumeOnServer.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.data;
      }
    );
    builder.addCase(updateResumeOnServer.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      deleteResumeThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = "";
        state.resumes = state.resumes.filter((r) => r.id !== action.payload);
        state.total -= 1;
      }
    );
    builder.addCase(
      deleteResumeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.data;
      }
    );
    builder.addCase(deleteResumeThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
  },
});
export const {
  addOrUpdateResume,
  markAsSaved,
  deleteResume,
  setCurrentPage,
  setLimit,
  setSearch,
} = resumeSlice.actions;

//export default resumeSlice.reducer;
export const resumeReducer = resumeSlice.reducer;

//BUG on submit remove the saved draft
//BUG on edit finalized data saved as draft what to do
