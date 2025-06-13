import { selectDraftResumeByID } from "@/slices/resumes/resumeSelectors";
import { getResumeByIDThunk } from "@/slices/resumes/resumeThunks";
import { AppDispatch, RootState } from "@/store";
import { Resume } from "@/types/resume";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchResume = (id: string, type: "draft" | "final"): Resume => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentResume } = useSelector((state: RootState) => state.resumes);
  const draftedResumeById = useSelector(selectDraftResumeByID(id ?? ""));

  const getSavedResume = useCallback(async () => {
    await dispatch(getResumeByIDThunk(id ?? ""));
  }, [dispatch, id]);

  useEffect(() => {
    if (type !== "draft") getSavedResume();
  }, [getSavedResume, type]);

  return type === "draft" ? draftedResumeById : currentResume;
};
