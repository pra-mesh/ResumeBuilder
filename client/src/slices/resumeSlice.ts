import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { Resume } from "@/types/resume";
import { saveResume } from "@/services/resume";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { URLS } from "@/constants";
import { RootState } from "@/store";

interface ResumeState {
  resumes: Resume[];
  filteredResume: Resume[];
  error: string;
  loading: boolean;
  total: number;
  currentPage: number;
  limit: number;
  searchValue: string;
}

export const initialState: ResumeState = {
  resumes: [],
  filteredResume: [],
  error: "",
  loading: false,
  total: 0,
  currentPage: 1,
  limit: 10,
  searchValue: "",
};
const selectResumeState = (state: RootState) => state.resumes;

export const selectPaginatedResumes = createSelector(
  selectResumeState,
  (resumeState) => {
    const { resumes, currentPage, limit, searchValue } = resumeState;
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

export const saveResumeToServer = createAsyncThunk(
  "resume/saveResumeToServer",
  async (payload: Resume, { rejectWithValue }) => {
    try {
      const res = await saveResume(payload);
      return res.data.data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data.err?.message ?? "Something went wrong",
      });
    }
  }
);
export const loadResumes = createAsyncThunk(
  "resume/LoadResume",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAdmin.get(`${URLS.RESUMES}?limit=10000&page=1`);
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
    addNewResume(state, action: PayloadAction<Resume>) {
      const index = state.resumes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      } else {
        state.resumes.push(action.payload);
        state.total += 1;
      }
    },
    updateResume(state, action: PayloadAction<Resume>) {
      const index = state.resumes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
    },
    markAsSaved(state, action: PayloadAction<Resume>) {
      const resume = state.resumes.find((r) => r.id === action.payload.id);
      if (resume) {
        resume.isSavedToServer = true;
        state.total -= 1;
      }
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
        state.total += 1;
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
      console.log({ fetchedResumes });
      fetchedResumes.forEach((fetchedResume: Resume) => {
        const data = JSON.stringify(fetchedResume);
        console.log(`Size: ${(new Blob([data]).size / 1024).toFixed(2)} KB`);
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
          state.total += 1;
        }
      });
      state.error = "";
    });
    builder.addCase(loadResumes.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.data;
    });
    builder.addCase(loadResumes.pending, (state) => {
      state.loading = true;
      state.error = "";
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

//BUG on submit remove the saved draft
//BUG on edit finalized data saved as draft what to do
