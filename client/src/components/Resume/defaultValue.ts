import { Resume } from "@/types/resume";

export const defaultValues: Resume = {
  id: "",
  title: "",
  status: "draft",
  updatedAt: "",
  isSavedToServer: false,
  template: "modern",
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
  education: [
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      course: "",
    },
  ],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
};
