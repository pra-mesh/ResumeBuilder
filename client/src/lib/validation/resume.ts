import { z } from "zod";
const isDateInFuture = (dateString: string) => {
  if (!dateString) return false;
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [inputYear, inputMonth] = dateString.split("-").map(Number);
  if (inputYear > currentYear) return true;
  if (inputYear === currentYear && inputMonth > currentMonth) return true;
  return false;
};
const isValidEndDate = (data: { startDate: string; endDate: string }) => {
  const [startYear, startMonth] = data.startDate.split("-").map(Number);
  const [endYear, endMonth] = data.endDate.split("-").map(Number);
  if (endYear >= startYear) return true;
  if (endYear === startYear && endMonth >= startMonth) return true;
  return false;
};
export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  github: z.string().url("Invalid github url").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid linkedin url").optional().or(z.literal("")),
  address: z.string().min(5, "Invalid Address"),
  website: z.string().url("Invalid website url").optional().or(z.literal("")),
});
export const educationSchema = z
  .object({
    institution: z.string().min(2, "Institution name is required"),
    degree: z.string().min(2, "Degree is required"),
    course: z.string().min(2, "Course/Field of study is required"),
    startDate: z.string().min(1, "start date is required"),
    endDate: z
      .string()
      .min(1, "End date is required")
      .refine((date) => !isDateInFuture(date), {
        message: "End date cannot be in the future",
      }),
  })
  .refine((data) => isValidEndDate(data), {
    message: "End date can't be smaller than start date",
    path: ["endDate"],
  });
export const experienceSchema = z.array(z.any()).optional(); // Adjust according to your Experience type
export const skillSchema = z.array(z.object({ name: z.string() })).optional();
export const projectSchema = z.array(z.any()).optional(); // Adjust according to your Projects type
export const certificationSchema = z.array(z.any()).optional(); // Adjust according to your Certifications type

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  educations: z
    .array(educationSchema)
    .min(1, "One education information is required"),
  experiences: experienceSchema,
  projects: projectSchema,
  skills: skillSchema,
  certifications: certificationSchema,
});

export const resumeFormSchema = z.object({
  // Resume metadata
  id: z.string(),
  title: z.string().min(1, "Resume title is required"),
  status: z.enum(["draft", "final"]),
  updatedAt: z.string(),
  isSavedToServer: z.boolean(),
  personalInfo: personalInfoSchema,
  educations: z
    .array(educationSchema)
    .min(1, "One education information is required"),
  experiences: experienceSchema,
  projects: projectSchema,
  skills: skillSchema,
  certifications: certificationSchema,
});

export const draftResumeSchema = z.object({
  personalInfo: personalInfoSchema,
  educations: z.array(educationSchema).optional(),
  experiences: experienceSchema,
  projects: projectSchema,
  skills: skillSchema,
  certifications: certificationSchema,
});
