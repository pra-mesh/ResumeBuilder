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
export const updateResumeServer = (resume: Resume) => {
  const { id, updatedAt, isSavedToServer, _id, ...payload } = resume;
  return axiosAdmin.put(`${URLS.RESUMES}/${id}`, payload);
};
export const deleteResume = (id: string) => {
  return axiosAdmin.delete(`${URLS.RESUMES}/${id}`);
};
