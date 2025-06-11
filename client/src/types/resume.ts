export interface ResumeState {
  resumes: Resume[];
  filteredResume: Resume[];
  error: string;
  loading: boolean;
  total: number;
  currentPage: number;
  limit: number;
  searchValue: string;
}

export const initialState: ResumeState = {
  resumes: [],
  filteredResume: [],
  error: "",
  loading: false,
  total: 0,
  currentPage: 1,
  limit: 10,
  searchValue: "",
};

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  github?: string;
  linkedin?: string;
  website?: string;
}
export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  course: string;
}
export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}
export interface Skills {
  name: string;
}
export interface Projects {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}
export interface certification {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeCoreSections {
  personalInfo: PersonalInfo;
  education: Education[];
  experience?: Experience[];
  projects?: Projects[];
  skills?: Skills[];
  certifications?: certification[];
}

export interface Resume extends ResumeCoreSections {
  id: string;
  title: string;
  status: "draft" | "final";
  updatedAt: string;
  template: string;
  isSavedToServer: boolean;
  _id?: string;
}
