import { useFormContext } from "react-hook-form";

import type { Resume } from "@/types/resume";
import ResumeView from "../templates/ResumeView";

export function ResumePreview() {
  const { watch, setValue } = useFormContext<Resume>();

  const formData = watch();
  const handleTemplateChange = (template: string) => {
    setValue("template", template, { shouldValidate: true });
  };
  //const [isGeneratingPDF, generatingPDF] = useState(false);

  return (
    <>
      <ResumeView
        desc=" Review your resume before saving. This is how your resume will look when exported."
        resume={formData}
        handleTemplateChange={handleTemplateChange}
      />
    </>
  );
}
