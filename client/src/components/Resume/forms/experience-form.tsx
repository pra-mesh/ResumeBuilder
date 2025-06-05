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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Sparkle } from "@/components/ui/sparkle";

import { toast } from "sonner";
import { Resume } from "@/types/resumeProps";
import { useGetAIText } from "@/hooks/useResumeMutation";

// Helper function to get current month in YYYY-MM format
const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export function ExperienceForm() {
  const GetAi = useGetAIText();
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<Resume>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const addExperience = () => {
    append({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  const handleGenerateDescription = async (index: number) => {
    const summary = await getValues("personalInfo.summary");
    const title = await getValues("title");
    const info = summary ? summary : title;
    if (!info) {
      toast.info("Info", {
        description: "Either provide summary or resume title",
      });
      return;
    }
    const generatedDescription = await GetAi.mutateAsync({
      query: info,
      section: "summary",
    });
    setValue(`experiences.${index}.description`, generatedDescription, {
      shouldValidate: true,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>
          Add your work experience, including internships, part-time jobs, and
          volunteer work. This section is optional.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">No work experience added yet.</p>
            <p className="text-sm">
              You can skip this section or add your work experience below.
            </p>
          </div>
        ) : (
          fields.map((field, index) => {
            const isCurrent = watch(`experiences.${index}.current`);

            return (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.company`}>
                      Company *
                    </Label>
                    <Input
                      {...register(`experiences.${index}.company`)}
                      placeholder="Example Corp"
                    />
                    {errors.experiences?.[index]?.company && (
                      <p className="text-sm text-destructive">
                        {errors.experiences[index]?.company?.message as string}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.position`}>
                      Position *
                    </Label>
                    <Input
                      {...register(`experiences.${index}.position`)}
                      placeholder="Software Engineer"
                    />
                    {errors.experiences?.[index]?.position && (
                      <p className="text-sm text-destructive">
                        {errors.experiences[index]?.position?.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`experiences.${index}.location`}>
                    Location *
                  </Label>
                  <Input
                    {...register(`experiences.${index}.location`)}
                    placeholder="San Francisco, CA"
                  />
                  {errors.experiences?.[index]?.location && (
                    <p className="text-sm text-destructive">
                      {errors.experiences[index]?.location?.message as string}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.startDate`}>
                      Start Date *
                    </Label>
                    <Input
                      type="month"
                      {...register(`experiences.${index}.startDate`)}
                      max={getCurrentMonth()}
                    />
                    {errors.experiences?.[index]?.startDate && (
                      <p className="text-sm text-destructive">
                        {
                          errors.experiences[index]?.startDate
                            ?.message as string
                        }
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.endDate`}>
                      End Date
                    </Label>
                    <Input
                      type="month"
                      {...register(`experiences.${index}.endDate`)}
                      disabled={isCurrent}
                      max={getCurrentMonth()}
                    />
                    {errors.experiences?.[index]?.endDate && (
                      <p className="text-sm text-destructive">
                        {errors.experiences[index]?.endDate?.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`experiences.${index}.current`}
                    checked={isCurrent}
                    onCheckedChange={(checked) => {
                      const isChecked = Boolean(checked);
                      setValue(`experiences.${index}.current`, isChecked);
                      if (checked) {
                        setValue(`experiences.${index}.endDate`, "");
                      }
                    }}
                  />
                  <Label htmlFor={`experiences.${index}.current`}>
                    I currently work here
                  </Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`experiences.${index}.description`}>
                      Description *
                    </Label>
                    <Sparkle
                      onClick={() => handleGenerateDescription(index)}
                      tooltip="Generate job description with AI"
                    />
                  </div>
                  <Textarea
                    {...register(`experiences.${index}.description`)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="min-h-[100px]"
                  />
                  {errors.experiences?.[index]?.description && (
                    <p className="text-sm text-destructive">
                      {
                        errors.experiences[index]?.description
                          ?.message as string
                      }
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}

        <Button
          type="button"
          variant="outline"
          onClick={addExperience}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
}
