import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResumeState {
  resume: string;
}
const initialState: ResumeState = {
  resume: "",
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    resetResume() {
      return initialState;
    },
    // removeExperience(state, action: PayloadAction) {},
    // addExperience(state, action: PayloadAction) {},
    // updateExperience(state, action: PayloadAction) {},
  },
});
export const {
  resetResume,
  //   removeExperience,
  //   addExperience,
  //   updateExperience,
} = resumeSlice.actions;
export default resumeSlice.reducer;
