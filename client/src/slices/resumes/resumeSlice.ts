import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resume, initialState } from "@/types/resume";
import {
  loadResumes,
  saveResumeToServer,
  updateResumeOnServer,
  deleteResumeThunk,
  getResumeByIDThunk,
} from "./resumeThunks";

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  //Drafting resume to states
  reducers: {
    addOrUpdateDraft(state, action: PayloadAction<Resume>) {
      const index = state.resumesDrafts.findIndex(
        (r) => r.id === action.payload.id
      );
      if (index !== -1) {
        state.resumesDrafts[index] = action.payload;
      } else {
        console.log({ drafts: action.payload });
        state.resumesDrafts.push(action.payload);
      }
      console.log({ drafts: state.resumesDrafts });
    },

    markAsSaved(state, action: PayloadAction<Resume>) {
      const resume = state.resumesDrafts.find(
        (r) => r.id === action.payload.id
      );
      if (resume) resume.isSavedToServer = true;
      state.resumesDrafts = state.resumesDrafts.filter(
        (r) => r.id !== resume?.id
      );
    },
    deleteResume(state, action: PayloadAction<string>) {
      state.resumesDrafts = state.resumesDrafts.filter(
        (r) => r.id !== action.payload
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.currentPage = 1;
      state.totalPages = Math.ceil(state.total / state.limit);
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
      (state, action: PayloadAction<any>) => {
        const fetchedResumes = action.payload.data.map((resume: Resume) => ({
          ...resume,
          id: resume._id ?? "",
          isSavedToServer: true,
        }));
        state.total = action.payload.total;
        state.totalPages = Math.ceil(state.total / state.limit);
        state.resumes = fetchedResumes;
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
    builder.addCase(
      getResumeByIDThunk.fulfilled,
      (state, action: PayloadAction<Resume>) => {
        state.loading = false;
        const fetchedResumes = action.payload;
        const loadedData = {
          ...fetchedResumes,
          id: fetchedResumes?._id ?? "",
          isSavedToServer: true,
        };
        state.currentResume = loadedData;
        state.error = "";
      }
    );
    builder.addCase(
      getResumeByIDThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.data;
      }
    );
    builder.addCase(
      getResumeByIDThunk.pending,
      (state, _: PayloadAction<any>) => {
        state.loading = true;
        state.error = "";
      }
    );
  },
});
export const {
  addOrUpdateDraft,
  markAsSaved,
  deleteResume,
  setCurrentPage,
  setLimit,
  setSearch,
} = resumeSlice.actions;

//export default resumeSlice.reducer;
export const resumeReducer = resumeSlice.reducer;

//BUG on sv remove the saved draft
//BUG on edit finalized data saved as draft what to do
