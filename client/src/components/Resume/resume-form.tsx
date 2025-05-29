import { useForm } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import PersonalInfo from "./steps/personal-Info";
import StepIndicator from "./steps/step-indicator";
import { useState } from "react";

import Skills from "./steps/skills";
import Projects from "./steps/projects";
import Certifications from "./steps/certifications";
import Preview from "./steps/review";
import { Button } from "../ui/button";
import Education from "./steps/education";
import Experience from "./steps/experience";

const ResumeForm = () => {
  //[ ] Move this to another file to organize code
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  //Sets default form value
  const form = useForm({
    // TODO: Add Validation to form
    defaultValues: {
      title: "",
      personalInfo: {
        github: "",
        linkedin: "",
        phone: "",
        address: "",
        website: "",
      },
      summary: "",
      education: [
        {
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          course: "",
        },
      ],
      experience: [
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
      skills: [{ name: "" }],
      projects: [
        {
          title: "",
          description: "",
          technologies: [""],
          link: "",
        },
      ],
      certification: [
        {
          name: "",
          issuer: "",
          date: "",
        },
      ],
    },
  });
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(10, 10);
    }
  };
  const handleNext = () => {
    console.log(`Moving from Step ${currentStep} to ${currentStep + 1}`);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(10, 10);
    }
  };
  const onsubmit = (data: any) => {
    if (currentStep !== totalSteps) {
      console.log("Form attempted to submit prematurely on step", currentStep);
      return;
    }
    console.log("Form submitted with data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} id="resumeForm">
        <Card>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Resume Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Software Developer Resume"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        {currentStep === 1 && <PersonalInfo form={form} />}
        {currentStep === 2 && <Education form={form} />}
        {currentStep === 3 && <Experience form={form} />}
        {currentStep === 4 && <Skills form={form} />}
        {currentStep === 5 && <Projects form={form} />}
        {currentStep === 6 && <Certifications form={form} />}
        {currentStep >= 7 && <Preview form={form} />}
        <div className="flex justify-between mt-3">
          <Button
            type="button"
            onClick={handlePrevious}
            variant="outline"
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {currentStep === totalSteps && (
            <Button type="submit">Submit Resume</Button>
          )}  {currentStep !== totalSteps &&(
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ResumeForm;
