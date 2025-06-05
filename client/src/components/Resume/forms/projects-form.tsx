import type React from "react";

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
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Sparkle } from "@/components/ui/sparkle";
import { generateProjectDescription } from "@/lib/ai-helpers";
import { toast } from "sonner";
import { ResumeCoreSections } from "@/types/resumeProps";

export function ProjectsForm() {
  const { control, setValue, getValues } = useFormContext<ResumeCoreSections>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const addProject = () => {
    append({
      title: "",
      description: "",
      technologies: [],
      link: "",
    });
  };

  const handleGenerateDescription = async (index: number) => {
    try {
      const project = getValues(`projects.${index}`);

      // Check if required fields are filled
      if (
        !project.title ||
        !project.technologies ||
        project.technologies.length === 0
      ) {
        toast.info("Missing Information", {
          description:
            "Please fill in project title and add at least one technology before generating description.",
        });
        return;
      }

      const generatedDescription = await generateProjectDescription(project);
      setValue(`projects.${index}.description`, generatedDescription);
      toast.success("Description Generated!", {
        description: "AI has generated a project description for you.",
      });
    } catch {
      toast.error("Error", {
        description: "Failed to generate description. Please try again.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          Showcase your personal projects, open source contributions, or
          significant work projects. This section is optional.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">No projects added yet.</p>
            <p className="text-sm">
              You can skip this section or add your projects below.
            </p>
          </div>
        ) : (
          fields.map((field, index) => (
            <ProjectItem
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
              canRemove={true}
              onGenerateDescription={handleGenerateDescription}
            />
          ))
        )}

        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
}

function ProjectItem({
  index,
  onRemove,
  canRemove,
  onGenerateDescription,
}: {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  onGenerateDescription: (index: number) => Promise<void>;
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeCoreSections>();
  const [techInput, setTechInput] = useState("");

  const technologies = watch(`projects.${index}.technologies`) || [];

  const addTechnology = () => {
    if (techInput.trim()) {
      const newTechnologies = [...technologies, techInput.trim()];
      setValue(`projects.${index}.technologies`, newTechnologies);
      setTechInput("");
    }
  };

  const removeTechnology = (techIndex: number) => {
    const newTechnologies = technologies.filter(
      (_: string, i: number) => i !== techIndex
    );
    setValue(`projects.${index}.technologies`, newTechnologies);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology();
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Project {index + 1}</h4>
        {canRemove && (
          <Button type="button" variant="outline" size="sm" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`projects.${index}.title`}>Project Title *</Label>
          <Input
            {...register(`projects.${index}.title`)}
            placeholder="My Awesome Project"
          />
          {errors.projects?.[index]?.title && (
            <p className="text-sm text-destructive">
              {errors.projects[index]?.title?.message as string}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`projects.${index}.link`}>Project Link</Label>
          <Input
            {...register(`projects.${index}.link`)}
            placeholder="https://github.com/username/project"
          />
          {errors.projects?.[index]?.link && (
            <p className="text-sm text-destructive">
              {errors.projects[index]?.link?.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={`projects.${index}.description`}>Description *</Label>
          <Sparkle
            onClick={() => onGenerateDescription(index)}
            tooltip="Generate project description with AI"
          />
        </div>
        <Textarea
          {...register(`projects.${index}.description`)}
          placeholder="Describe what the project does, your role, and key achievements..."
          className="min-h-[100px]"
        />
        {errors.projects?.[index]?.description && (
          <p className="text-sm text-destructive">
            {errors.projects[index]?.description?.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Technologies Used *</Label>
        <div className="flex space-x-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter technology and press Enter"
          />
          <Button type="button" onClick={addTechnology} size="sm">
            Add
          </Button>
        </div>
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech: string, techIndex: number) => (
              <div
                key={techIndex}
                className="flex items-center space-x-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => removeTechnology(techIndex)}
                  className="text-secondary-foreground/60 hover:text-secondary-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.projects?.[index]?.technologies && (
          <p className="text-sm text-destructive">
            {errors.projects[index]?.technologies?.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
