import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//import { useState } from "react";
import ModernTemplates from "./modernTemplates";
import ClassicTemplates from "./ClassicTemplates";
import MinimalTemplate from "./minimalTemplate";
import type { Resume } from "@/types/resume";
import { templates } from "@/types/resumeTemplate";
import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import html2canvas from "html2canvas-pro";
import usePrint from "@/hooks/usePrint";
import jsPDF from "jspdf";

interface previewProps {
  resume: Resume;
  desc: string;
  handleTemplateChange?: (template: "modern" | "classic" | "minimal") => void;
}

const ResumeView = ({ resume, desc, handleTemplateChange }: previewProps) => {
  const [newTemplate, setNewTemplate] = useState<
    "modern" | "classic" | "minimal"
  >(resume.template as "modern" | "classic" | "minimal");

  const handlePDFDownload = async () => {
    if (componentRef.current) {
      try {
        const canvas = await html2canvas(componentRef.current, {
          scale: 3, // Improves resolution
          useCORS: true, // Ensures external styles are applied
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        console.log({ pdfWidth });
        const pdfHeight = pdf.internal.pageSize.getHeight() - 20;
        let currentHeight = 0;

        while (currentHeight < canvas.height) {
          pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
          currentHeight += pdfHeight;

          if (currentHeight < canvas.height) {
            pdf.addPage();
          }
        }
        pdf.save("document.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  const { componentRef, handlePrint } = usePrint();
  const Templates: Record<string, JSX.Element | null> = {
    modern: <ModernTemplates {...resume} />,
    classic: <ClassicTemplates {...resume} />,
    minimal: <MinimalTemplate {...resume} />,
  };
  const TemplateChange = (template: "modern" | "classic" | "minimal") => {
    setNewTemplate(template);
    if (handleTemplateChange) {
      handleTemplateChange(template);
    }
  };
  const renderTemplates = () =>
    Templates[newTemplate] || <ModernTemplates {...resume} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <CardDescription>
          <div className="flex flex-row justify-between">
            <p>{desc}</p>

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
                  template.id === newTemplate ? "border-primary border-1" : ""
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
