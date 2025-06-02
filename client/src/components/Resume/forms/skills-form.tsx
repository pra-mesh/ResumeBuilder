"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

export function SkillsForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  })

  const addSkill = () => {
    append({ name: "" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          List your technical and soft skills that are relevant to your career. This section is optional.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">No skills added yet.</p>
            <p className="text-sm">You can skip this section or add your skills below.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end space-x-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`skills.${index}.name`}>Skill {index + 1}</Label>
                  <Input {...register(`skills.${index}.name`)} placeholder="JavaScript, React, Node.js..." />
                  {errors.skills?.[index]?.name && (
                    <p className="text-sm text-destructive">{errors.skills[index]?.name?.message as string}</p>
                  )}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button type="button" variant="outline" onClick={addSkill} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </CardContent>
    </Card>
  )
}
