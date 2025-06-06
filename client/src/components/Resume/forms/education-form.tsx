import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ResumeCoreSections } from "@/types/resume";

// Helper function to get current month in YYYY-MM format
const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export function EducationForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeCoreSections>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  const addEducation = () => {
    append({
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      course: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>
          Add your educational background, including degrees, certifications,
          and relevant coursework.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Education {index + 1}</h4>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`educations.${index}.institution`}>
                  Institution <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register(`educations.${index}.institution`)}
                  placeholder="University of Example"
                />
                {errors.educations?.[index]?.institution && (
                  <p className="text-sm text-destructive">
                    {errors.educations[index]?.institution?.message as string}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`educations.${index}.degree`}>
                  Degree <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register(`educations.${index}.degree`)}
                  placeholder="Bachelor of Science"
                />
                {errors.educations?.[index]?.degree && (
                  <p className="text-sm text-destructive">
                    {errors.educations[index]?.degree?.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`educations.${index}.course`}>
                Field of Study <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`educations.${index}.course`)}
                placeholder="Computer Science"
              />
              {errors.educations?.[index]?.course && (
                <p className="text-sm text-destructive">
                  {errors.educations[index]?.course?.message as string}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`educations.${index}.startDate`}>
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="month"
                  {...register(`educations.${index}.startDate`)}
                  max={getCurrentMonth()}
                />
                {errors.educations?.[index]?.startDate && (
                  <p className="text-sm text-destructive">
                    {errors.educations[index]?.startDate?.message as string}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`educations.${index}.endDate`}>
                  End Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="month"
                  {...register(`educations.${index}.endDate`)}
                  max={getCurrentMonth()}
                />
                {errors.educations?.[index]?.endDate && (
                  <p className="text-sm text-destructive">
                    {errors.educations[index]?.endDate?.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addEducation}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
