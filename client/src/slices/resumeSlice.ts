import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resume } from "@/types/resumeProps";

interface ResumeState {
  resumes: Resume[];
}

const initialState: ResumeState = {
  resumes: [],
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  //Drafting resume to states
  reducers: {
    addNewResume(state, action: PayloadAction<Resume>) {
      state.resumes.push(action.payload);
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
});
export const { addNewResume, updateResume, markAsSaved, deleteResume } =
  resumeSlice.actions;
export default resumeSlice.reducer;
