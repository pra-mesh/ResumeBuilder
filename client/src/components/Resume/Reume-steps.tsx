import { CertificationsForm } from "@/components/Resume/forms/certifications-form";
import { EducationForm } from "@/components/Resume/forms/education-form";
import { ExperienceForm } from "@/components/Resume/forms/experience-form";
import { PersonalInfoForm } from "@/components/Resume/forms/personal-info-form";
import { ProjectsForm } from "@/components/Resume/forms/projects-form";
import { SkillsForm } from "@/components/Resume/forms/skills-form";
import { ResumePreview } from "@/components/Resume/forms/resume-preview";
import { Resume } from "@/types/resume";
import { JSX } from "react";

export const stepFieldsMap: Record<number, (keyof Resume)[]> = {
  0: ["title", "personalInfo"],
  1: ["education"],
  2: ["experience"],
  3: ["skills"],
  4: ["projects"],
  5: ["certifications"],
  6: [],
};

export const stepComponentsMap: Record<number, JSX.Element | null> = {
  0: <PersonalInfoForm />,
  1: <EducationForm />,
  2: <ExperienceForm />,
  3: <SkillsForm />,
  4: <ProjectsForm />,
  5: <CertificationsForm />,
  6: <ResumePreview />,
};
