import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  certification,
  Education,
  Experience,
  Projects,
  Resume,
} from "@/types/resume";

import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeFormSchema } from "@/lib/validation/resume";

import { CertificationsForm } from "@/components/Resume/forms/certifications-form";
import { EducationForm } from "@/components/Resume/forms/education-form";
import { ExperienceForm } from "@/components/Resume/forms/experience-form";
import { PersonalInfoForm } from "@/components/Resume/forms/personal-info-form";
import { ProjectsForm } from "@/components/Resume/forms/projects-form";
import { SkillsForm } from "@/components/Resume/forms/skills-form";
import { ResumePreview } from "@/components/Resume/forms/resume-preview";
import { CheckCheck, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import StepIndicator from "./forms/step-indicator";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { steps } from "./steps";
import { defaultValues as defaultResumeValues } from "./defaultValue";
import { AppDispatch, RootState } from "@/store";
import { addOrUpdateResume, markAsSaved } from "@/slices/resumes/resumeSlice";
import { toast } from "sonner";
import useDisableButton from "@/hooks/useDisableButton";
import {
  saveResumeToServer,
  updateResumeOnServer,
} from "@/slices/resumes/resumeThunks";

const ResumeForm = ({
  mode,
  defaultValues = defaultResumeValues,
}: {
  mode: "edit" | "create";
  defaultValues?: Resume;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, resumes } = useSelector(
    (state: RootState) => state.resumes
  );
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<Resume>({
    resolver: zodResolver(resumeFormSchema as any),
    defaultValues,
    mode: "onChange",
  });
  const { isDisabled, disableButtonTemporarily } = useDisableButton();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = methods;
  //TOLearn Learn about records
  const stepFieldsMap: Record<number, (keyof Resume)[]> = {
    0: ["title", "personalInfo"],
    1: ["education"],
    2: ["experience"],
    3: ["skills"],
    4: ["projects"],
    5: ["certifications"],
    6: [],
  };

  const stepComponentsMap: Record<number, JSX.Element | null> = {
    0: <PersonalInfoForm />,
    1: <EducationForm />,
    2: <ExperienceForm />,
    3: <SkillsForm />,
    4: <ProjectsForm />,
    5: <CertificationsForm />,
    6: <ResumePreview />,
  };

  const validateStep = async () => {
    const fieldsToValidate = stepFieldsMap[currentStep] || [];
    if (currentStep === 0 || currentStep === 1)
      return await trigger(fieldsToValidate);
    if (currentStep < 6) {
      const sectionName = fieldsToValidate[0];
      const currentData = getValues()[sectionName];
      return Array.isArray(currentData) && currentData.length > 0
        ? await trigger(fieldsToValidate)
        : true;
    }
    return true; // No validation needed for preview step
  };
  const cleanEducation = (education: Education[]) => {
    const cleanedEducation = education.filter(
      (edu) =>
        edu.course.trim() !== "" ||
        edu.degree.trim() !== "" ||
        edu.institution.trim() !== ""
    );
    setValue("education", cleanedEducation, { shouldValidate: true });
  };

  const cleanExperience = (experience: Experience[]) => {
    const cleanedExperience = experience.filter(
      (exp) =>
        exp.company.trim() !== "" ||
        exp.description.trim() !== "" ||
        exp.location.trim() !== "" ||
        exp.position.trim() !== ""
    );
    setValue("experience", cleanedExperience);
  };

  const cleanProjects = (projects: Projects[]) => {
    const cleanedProject = projects.filter(
      (project) =>
        project.description.trim() !== "" || project.title.trim() !== ""
    );
    setValue("projects", cleanedProject);
  };
  const cleanCertifications = (certification: certification[]) => {
    const cleanedCertification = certification.filter(
      (certification) =>
        certification.issuer.trim() != "" || certification.name.trim() != ""
    );
    setValue("certifications", cleanedCertification);
  };

  const nextStep = async () => {
    const currentData = getValues();
    if (await validateStep()) {
      if (currentStep === 1) cleanEducation(currentData.education);

      if (currentStep === 2 && currentData.experience)
        cleanExperience(currentData.experience);

      if (currentStep === 4 && currentData.projects)
        cleanProjects(currentData.projects);

      if (currentStep === 5 && currentData.certifications)
        cleanCertifications(currentData.certifications);

      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const isFirstTwoStepsValid = () => {
    watch(["personalInfo", "education"]);
    const personalInfo = getValues().personalInfo;
    const education = getValues().education;
    const isPersonalInfoValid =
      !!personalInfo.email &&
      !!personalInfo.fullName &&
      !!personalInfo.phone &&
      !!personalInfo.summary &&
      !!personalInfo.address;
    const isEducationValid =
      Array.isArray(education) &&
      education.length > 0 &&
      education.every(
        (e) =>
          !!e.institution &&
          !!e.startDate &&
          !!e.endDate &&
          !!e.degree &&
          !!e.course
      );
    return isPersonalInfoValid && isEducationValid;
  };

  const onSubmit = async (data: Resume) => {
    const resume = { ...data };
    resume.status = "final";
    try {
      /*TOLearn why use unwrap 
      on this case we used unwrap because if we use on error check if else it will be always true since update will not be awaited
      maybe we could use combination of if with checking both error and loading. Is using unwrap is more efferent?
      */
      disableButtonTemporarily(4000);
      if (mode === "edit")
        await dispatch(updateResumeOnServer(resume)).unwrap();
      else await dispatch(saveResumeToServer(resume)).unwrap();
      dispatch(markAsSaved(resume));
      toast.success("Resume saved successfully", {
        description: "Your Resume has been added to your collection",
        icon: <CheckCheck className="h-4 w-4" />,
      });
      setTimeout(() => {
        reset(defaultValues);
        navigate("/user/resumes");
      }, 4000);
    } catch (err: any) {
      toast.error("Resume save failed.", {
        description:
          typeof err?.data === "string"
            ? err.data
            : "Failed to save resume to your collection",
        icon: <CheckCheck className="h-4 w-4" />,
      });
    }
  };

  const onerror = (errors: FieldErrors<Resume>) => {
    console.error("Validation failed:", errors);
    toast.error("Validation failed. Please fill all required fields.", {
      description: "Check red error messages in the form.",
    });
  };
  const onSaveDraft = async (data: Resume) => {
    try {
      const index = resumes.findIndex((r: Resume) => r.id === data.id);
      disableButtonTemporarily(4000);
      if (index !== -1 && data.id !== "") {
        const resume: Resume = {
          ...data,
          updatedAt: new Date().toISOString(),
        };
        dispatch(addOrUpdateResume(resume));
      } else {
        const resume: Resume = {
          ...data,
          id: uuidv4(),
          status: "draft",
          updatedAt: new Date().toISOString(),
          isSavedToServer: false,
        };
        dispatch(addOrUpdateResume(resume));
        setValue("id", resume.id);
      }
      toast.success("Resume draft saved successfully");
    } catch (e) {
      console.error("Error saving resume:", e);
      alert("Saved failed. Please try again");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto  px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                <div className="space-y-2 w-full">
                  <Label htmlFor="title">
                    Resume Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="CEO"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive text-left">
                      {errors.title?.message}
                    </p>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
          <StepIndicator steps={steps} currentStep={currentStep} />
          <FormProvider {...methods}>
            <form className="mt-5">{stepComponentsMap[currentStep]}</form>
            <div className="flex justify-between mt-3">
              <Button
                type="button"
                onClick={previousStep}
                variant="outline"
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 2-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                {currentStep === steps.length - 1 ? (
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleSubmit(onSubmit, onerror)}
                    disabled={isSubmitting || isDisabled}
                  >
                    {isSubmitting ? (
                      <>
                        <div>Saving...</div>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Resume
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    {(mode === "create" || !defaultValues.isSavedToServer) && (
                      <Button
                        type="button"
                        onClick={handleSubmit(onSaveDraft)}
                        variant="default"
                        disabled={
                          isSubmitting ||
                          isLoading ||
                          !isFirstTwoStepsValid() ||
                          isDisabled
                        }
                      >
                        {isSubmitting || isLoading ? (
                          <>
                            <div>Saving Draft... </div>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" /> Save as draft
                          </>
                        )}
                      </Button>
                    )}
                    <Button type="button" onClick={nextStep} variant="outline">
                      Next
                      <ChevronRight className="h-4 w-4 mr-2" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
