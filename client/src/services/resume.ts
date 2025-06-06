import { URLS } from "@/constants";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { Resume } from "@/types/resume";

export const saveResume = (payload: Omit<Resume, "id">) => {
  return axiosAdmin.post(`${URLS.RESUMES}`, payload);
};
