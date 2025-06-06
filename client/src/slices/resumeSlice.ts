import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Resume } from "@/types/resume";
import { saveResume } from "@/services/resume";

interface ResumeState {
  resumes: Resume[];
  currentResumeId: string | null;
  error: string;
  loading: boolean;
}

const initialState: ResumeState = {
  resumes: [],
  currentResumeId: null,
  error: "",
  loading: false,
};
export const saveResumeToServer = createAsyncThunk(
  "resume/saveResumeToServer",
  async (payload: Resume, { rejectWithValue }) => {
    try {
      const res = await saveResume(payload);
      return res.data;
    } catch (e: any) {
      console.log({ response: e?.response?.data?.err?.message });
      return rejectWithValue({
        data: e?.response?.data.err?.message ?? "Something went wrong",
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
  },
});
export const { addNewResume, updateResume, markAsSaved, deleteResume } =
  resumeSlice.actions;
export default resumeSlice.reducer;
