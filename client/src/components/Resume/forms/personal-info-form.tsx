import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkle } from "@/components/ui/sparkle";
import { toast } from "sonner";
import { Resume } from "@/types/resume";
import { useGetAIText } from "@/hooks/useResumeAIMutation";

export function PersonalInfoForm() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<Resume>();
  const GetAi = useGetAIText();
  const handleGenerateSummary = async () => {
    const summary = await getValues("personalInfo.summary");
    const title = await getValues("title");
    const info = summary ? summary : title;
    if (!info) {
      toast.info("Info", {
        description: "Either provide summary or resume title",
      });
      return;
    }
    const generatedSummary = await GetAi.mutateAsync({
      query: info,
      section: "summary",
    });
    setValue("personalInfo.summary", generatedSummary, {
      shouldValidate: true,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Tell us about yourself. This information will appear at the top of
          your resume.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              {...register("personalInfo.fullName")}
              placeholder="John Doe"
            />
            {errors.personalInfo?.fullName && (
              <p className="text-sm text-destructive">
                {errors.personalInfo.fullName.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("personalInfo.email")}
              placeholder="john@example.com"
            />
            {errors.personalInfo?.email && (
              <p className="text-sm text-destructive">
                {errors.personalInfo.email.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              {...register("personalInfo.phone")}
              placeholder="9841362926"
            />
            {errors.personalInfo?.phone && (
              <p className="text-sm text-destructive">
                {errors.personalInfo.phone.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              {...register("personalInfo.address")}
              placeholder="123 Main St, City, State 12345"
            />
            {errors.personalInfo?.address && (
              <p className="text-sm text-destructive">
                {errors.personalInfo?.address?.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary">
              Professional Summary <span className="text-red-500">*</span>
            </Label>
            <Sparkle
              onClick={handleGenerateSummary}
              tooltip="Generate professional summary with AI"
            />
          </div>
          <Textarea
            id="summary"
            {...register("personalInfo.summary")}
            placeholder="A brief summary of your professional background and career objectives..."
            className="min-h-[100px]"
            minLength={50}
          />
          {errors.personalInfo?.summary && (
            <p className="text-sm text-destructive">
              {errors.personalInfo.summary.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              {...register("personalInfo.github")}
              placeholder="https://github.com/johndoe"
              type="url"
            />
            {errors.personalInfo?.github && (
              <p className="text-sm text-destructive">
                {errors.personalInfo.github.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              {...register("personalInfo.linkedin")}
              placeholder="https://linkedin.com/in/johndoe"
              type="url"
            />
            {errors.personalInfo?.linkedin && (
              <p className="text-sm text-destructive">
                {errors.personalInfo.linkedin.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            {...register("personalInfo.website")}
            placeholder="https://johndoe.com"
            type="url"
          />
          {errors.personalInfo?.website && (
            <p className="text-sm text-destructive">
              {errors.personalInfo.website.message as string}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
