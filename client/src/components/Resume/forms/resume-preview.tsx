import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//import { useState } from "react";
import ModernTemplates from "../templates/modernTemplates";
import ClassicTemplates from "../templates/ClassicTemplates";
import MinimalTemplate from "../templates/minimalTemplate";
import type { Resume, ResumeTemplate } from "@/types/resume";
import { templates } from "@/types/resumeTemplate";
import { JSX } from "react";
export function ResumePreview() {
  const { watch, setValue } = useFormContext<Resume>();
  const formData = watch();
  //const [isGeneratingPDF, generatingPDF] = useState(false);
  const handleTemplateChange = (template: ResumeTemplate) => {
    setValue("template", template, { shouldValidate: true });
  };
  //const handlePDFDownload = () => {};
  const renderTemplates = () =>
    Templates[formData.template] || <ModernTemplates {...formData} />;
  const Templates: Record<string, JSX.Element | null> = {
    modern: <ModernTemplates {...formData} />,
    classic: <ClassicTemplates {...formData} />,
    minimal: <MinimalTemplate {...formData} />,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <CardDescription>
          Review your resume before saving. This is how your resume will look
          when exported.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-primary text-center mb-2">
            Choose Template
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`text-center p-2 ${
                  template.id === formData.template
                    ? "border-primary border-1"
                    : ""
                }`}
                onClick={() =>
                  handleTemplateChange(template.id as ResumeTemplate)
                }
              >
                <h3 className="font-semibold text-center mb-2">
                  {template.name}
                </h3>
                <p className="text-sm">{template.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>{renderTemplates()}</div>
      </CardContent>
    </Card>
  );
}
