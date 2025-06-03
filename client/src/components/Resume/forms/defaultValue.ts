import { Resume } from "@/types/resumeProps";

export const defaultValues: Resume = {
  id: "",
  title: "",
  status: "draft",
  updatedAt: "",
  isSavedToServer: false,
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    github: "",
    linkedin: "",
    website: "",
  },
  educations: [
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      course: "",
    },
  ],
  experiences: [],
  skills: [],
  projects: [],
  certifications: [],
};
