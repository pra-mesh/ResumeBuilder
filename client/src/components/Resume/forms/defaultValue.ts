import { ResumeCoreSections } from "@/types/resumeProps";

export const defaultValues: ResumeCoreSections = {
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
