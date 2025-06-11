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
import type { Resume } from "@/types/resume";
import { templates } from "@/types/resumeTemplate";
import { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

import usePrint from "@/hooks/usePrint";

interface previewProps {
  resume: Resume;
  handleTemplateChange?: (template: "modern" | "classic" | "minimal") => void;
}
const ResumeView = ({ resume, handleTemplateChange }: previewProps) => {
  const handlePDFDownload = () => {};
  const { componentRef, handlePrint } = usePrint();
  const Templates: Record<string, JSX.Element | null> = {
    modern: <ModernTemplates {...resume} />,
    classic: <ClassicTemplates {...resume} />,
    minimal: <MinimalTemplate {...resume} />,
  };
  const TemplateChange = (template: "modern" | "classic" | "minimal") => {
    resume.template = template;
    if (handleTemplateChange) {
      handleTemplateChange(template);
    }
  };
  const renderTemplates = () =>
    Templates[resume.template] || <ModernTemplates {...resume} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <CardDescription>
          <div className="flex flex-row justify-between">
            <p>
              Review your resume before saving. This is how your resume will
              look when exported.
            </p>

            <ButtonGroup>
              <Button
                variant="outline"
                className="mr-2 h-8 w-8"
                type="button"
                onClick={handlePDFDownload}
              >
                <Download className="h-2 w-2" />
              </Button>
              <Button
                variant="outline"
                className="mr-2 h-8 w-8"
                type="button"
                onClick={handlePrint}
              >
                <Printer className="h-2 w-2" />
              </Button>
            </ButtonGroup>
          </div>
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
                  template.id === resume.template
                    ? "border-primary border-1"
                    : ""
                }`}
                onClick={() =>
                  TemplateChange(
                    template.id as "modern" | "classic" | "minimal"
                  )
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
        <div ref={componentRef}>{renderTemplates()}</div>
      </CardContent>
    </Card>
  );
};

export default ResumeView;
