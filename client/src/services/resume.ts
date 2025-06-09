/* eslint-disable @typescript-eslint/no-unused-vars */
import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { Resume } from "@/types/resume";

export const saveResume = (resume: Resume) => {
  try {
    const { id, updatedAt, isSavedToServer, ...payload } = resume;
    return axiosAdmin.post(`${URLS.RESUMES}`, payload);
  } catch (error: any) {
    throw new Error(error);
  }
};
