import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Resume, ResumeCoreSections } from "@/types/resumeProps";

import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "@/lib/validation/resume";

import { CertificationsForm } from "@/components/Resume/forms/certifications-form";
import { EducationForm } from "@/components/Resume/forms/education-form";
import { ExperienceForm } from "@/components/Resume/forms/experience-form";
import { PersonalInfoForm } from "@/components/Resume/forms/personal-info-form";
import { ProjectsForm } from "@/components/Resume/forms/projects-form";
import { SkillsForm } from "@/components/Resume/forms/skills-form";
import { ResumePreview } from "@/components/Resume/forms/resume-preview";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import StepIndicator from "./forms/step-indicator";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { steps } from "./forms/steps";
import { defaultValues } from "./forms/defaultValue";
import { AppDispatch } from "@/store";
import { addNewResume } from "@/slices/resumeSlice";

const ResumeForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<ResumeCoreSections>({
    resolver: zodResolver(resumeSchema as any),
    defaultValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const nextStep = async () => {
    if (currentStep >= steps.length - 1) return;
    //TODO: Validate the content
    let isValid = true;

    const fieldsToValidate = stepFieldsMap[currentStep] || [];
    if (currentStep === 0 || currentStep === 1) {
      isValid = await trigger(fieldsToValidate);
    } else if (currentStep < 6) {
      // TODO: Validate if there is content
      const currentData = getValues();
      const sectionName = fieldsToValidate[0];
      if (
        Array.isArray(currentData[sectionName]) &&
        currentData[sectionName].length > 0
      )
        isValid = await trigger(fieldsToValidate);
      //TODO skip validation if optional sections are empty
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
  const getResumeCoreSections = (): ResumeCoreSections =>
    methods.getValues() as ResumeCoreSections;

  const isFirstTwoStepsValid = () => {
    watch(["personalInfo", "educations"]);
    const personalInfo = getValues().personalInfo;
    const education = getValues().educations;
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
  const onSubmit = async (data: ResumeCoreSections) => {
    try {
      console.log(data);
      alert("Resume saved successfully");
    } catch (e) {
      console.error("Error saving resume:", e);
      alert("Saved failed. Please try again");
    }
  };
  const onSaveAndExit = async () => {
    try {
      const data = getResumeCoreSections();
      const resume: Resume = {
        ...data,
        id: uuidv4(),
        title: `resume-${uuidv4()}`,
        status: "draft",
        updatedAt: new Date().toISOString(),
        isSavedToServer: false,
      };
      dispatch(addNewResume(resume));
      alert("Resume draft saved successfully");
      //TODO: Either make it continue editing or add effect before navigate currently navigating because of previous click bug when saved
      navigate("/user/resumes");
    } catch (e) {
      console.error("Error saving resume:", e);
      alert("Saved failed. Please try again");
    }
  };
  //NOTES Learn about records
  const stepFieldsMap: Record<number, (keyof ResumeCoreSections)[]> = {
    0: ["personalInfo"],
    1: ["educations"],
    2: ["experiences"],
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
                  <Input id="title" type="text" placeholder="CEO" />
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
                      onClick={handleSubmit(onSaveAndExit)}
                      variant="default"
                      disabled={isSubmitting || !isFirstTwoStepsValid()}
                    >
                      {isSubmitting ? (
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
