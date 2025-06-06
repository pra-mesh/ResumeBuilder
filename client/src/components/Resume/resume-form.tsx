import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Resume } from "@/types/resume";

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
import { steps } from "./forms/steps";
import { defaultValues } from "./forms/defaultValue";
import { AppDispatch, RootState } from "@/store";
import {
  addNewResume,
  markAsSaved,
  saveResumeToServer,
} from "@/slices/resumeSlice";
import { toast } from "sonner";

const ResumeForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.resumes);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<Resume>({
    resolver: zodResolver(resumeFormSchema as any),
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const nextStep = async () => {
    if (currentStep >= steps.length - 1) return;
    let isValid = true;
    const fieldsToValidate = stepFieldsMap[currentStep] || [];
    //TODO Remove unfilled values of experience, project and education
    //validation loop
    if (currentStep === 0 || currentStep === 1) {
      isValid = await trigger(fieldsToValidate);
    } else if (currentStep < 6) {
      const currentData = getValues();
      const sectionName = fieldsToValidate[0];
      if (
        Array.isArray(currentData[sectionName]) &&
        currentData[sectionName].length > 0
      )
        isValid = await trigger(fieldsToValidate);
      //skips validation if optional sections are empty
      else isValid = true;
    } else {
      //Preview step no -validation required
      isValid = true;
    }
    if (isValid) setCurrentStep(currentStep + 1);
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
    dispatch(saveResumeToServer(resume));
    console.log({ errors });
    if (!error) {
      dispatch(markAsSaved(resume));
      toast.success("Resume saved successfully", {
        description: "Your Resume has been added to your collection",
        icon: <CheckCheck className="h-4 w-4" />,
      });
      setTimeout(() => {
        reset(defaultValues);
        navigate("/user/resumes");
      }, 4000);
    } else {
      toast.error("Resume save failed.", {
        description: "Failed to save resume to your collection",
        icon: <CheckCheck className="h-4 w-4" />,
      });
    }
  };
  useEffect(() => {}, [error]);
  const onSaveDraft = async (data: Resume) => {
    try {
      const resume: Resume = {
        ...data,
        id: uuidv4(),
        status: "draft",
        updatedAt: new Date().toISOString(),
        isSavedToServer: false,
      };
      console.log(resume);
      if (!error) {
        dispatch(addNewResume(resume));
        toast("Resume draft saved successfully");
      }
      //TODO: Either make it continue editing or add effect before navigate currently navigating because of previous click bug when saved
    } catch (e) {
      console.error("Error saving resume:", e);
      alert("Saved failed. Please try again");
    }
  };
  //NOTES Learn about records
  const stepFieldsMap: Record<number, (keyof Resume)[]> = {
    0: ["title", "personalInfo"],
    1: ["education"],
    2: ["experience"],
    3: ["skills"],
    4: ["projects"],
    5: ["certifications"],
    6: [],
  };
  const renderStepContent = () => stepComponentsMap[currentStep] || null;

  const stepComponentsMap: Record<number, JSX.Element | null> = {
    0: <PersonalInfoForm />,
    1: <EducationForm />,
    2: <ExperienceForm />,
    3: <SkillsForm />,
    4: <ProjectsForm />,
    5: <CertificationsForm />,
    6: <ResumePreview />,
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
            <form className="mt-5">{renderStepContent()}</form>
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
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
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
                    <Button
                      type="button"
                      onClick={handleSubmit(onSaveDraft)}
                      variant="default"
                      disabled={
                        isSubmitting || isLoading || !isFirstTwoStepsValid()
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
