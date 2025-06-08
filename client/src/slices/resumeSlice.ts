import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Resume } from "@/types/resume";
import { saveResume } from "@/services/resume";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { URLS } from "@/constants";

interface ResumeState {
  resumes: Resume[];
  currentResumeId: string | null;
  error: string;
  loading: boolean;
  total: number;
  currentPage: number;
  limit: number;
  searchValue: string;
}

export const initialState: ResumeState = {
  resumes: [],
  currentResumeId: null,
  error: "",
  loading: false,
  total: 0,
  currentPage: 1,
  limit: 1,
  searchValue: "",
};
export const saveResumeToServer = createAsyncThunk(
  "resume/saveResumeToServer",
  async (payload: Resume, { rejectWithValue }) => {
    try {
      const res = await saveResume(payload);
      return res.data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data.err?.message ?? "Something went wrong",
      });
    }
  }
);
export const loadResumes = createAsyncThunk(
  "resume/LoadResume",
  async (
    { limit, page, title }: { limit: number; page: number; title?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosAdmin.get(
        `${URLS.RESUMES}?limit=${limit}&page=${page}&title=${encodeURIComponent(
          title ?? ""
        )}`
      );
      return res.data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.err?.message ?? "Something went wrong",
      });
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  //Drafting resume to states
  reducers: {
    setCurrentResume(state, action: PayloadAction<string | null>) {
      state.currentResumeId = action.payload;
    },
    addNewResume(state, action: PayloadAction<Resume>) {
      const index = state.resumes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      } else state.resumes.push(action.payload);
    },
    updateResume(state, action: PayloadAction<Resume>) {
      const index = state.resumes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
    },
    markAsSaved(state, action: PayloadAction<Resume>) {
      const resume = state.resumes.find((r) => r.id === action.payload.id);
      if (resume) resume.isSavedToServer = true;
    },
    deleteResume(state, action: PayloadAction<string>) {
      state.resumes = state.resumes.filter((r) => r.id !== action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSearch: (state, action) => {
      state.currentPage = 1; //BUG on search text change goes to first page before data change delay
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveResumeToServer.fulfilled,
      (state, action: PayloadAction<Resume>) => {
        state.loading = false;
        state.resumes.push(action.payload);
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
    builder.addCase(loadResumes.fulfilled, (state, action: any) => {
      state.loading = false;
      const fetchedResumes = action.payload.data;
      fetchedResumes.forEach((fetchedResume: Resume) => {
        fetchedResume.id = fetchedResume._id ?? "";
        const existingIndex = state.resumes.findIndex(
          (r) => r.id === fetchedResume.id
        );

        if (existingIndex !== -1) {
          state.resumes[existingIndex] = {
            ...fetchedResume,
            isSavedToServer: true,
          };
        } else {
          state.resumes.push({
            ...fetchedResume,
            isSavedToServer: true,
          });
        }
      });

      state.total = action.payload.total;
    });
    builder.addCase(loadResumes.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.data;
      state.total = 0;
    });
    builder.addCase(loadResumes.pending, (state) => {
      state.loading = true;
      state.total = 0;
    });
  },
});
export const {
  addNewResume,
  updateResume,
  markAsSaved,
  deleteResume,
  setCurrentPage,
  setLimit,
  setSearch,
} = resumeSlice.actions;
//export default resumeSlice.reducer;
export const resumeReducer = resumeSlice.reducer;
