"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

// Helper function to get current month in YYYY-MM format
const getCurrentMonth = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `${year}-${month}`
}

export function CertificationsForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  })

  const addCertification = () => {
    append({
      name: "",
      issuer: "",
      date: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certifications</CardTitle>
        <CardDescription>
          Add any professional certifications, licenses, or credentials you have earned. This section is optional.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">No certifications added yet.</p>
            <p className="text-sm">You can skip this section or add your certifications below.</p>
          </div>
        ) : (
          fields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Certification {index + 1}</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`certifications.${index}.name`}>Certification Name *</Label>
                  <Input
                    {...register(`certifications.${index}.name`)}
                    placeholder="AWS Certified Solutions Architect"
                  />
                  {errors.certifications?.[index]?.name && (
                    <p className="text-sm text-destructive">{errors.certifications[index]?.name?.message as string}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`certifications.${index}.issuer`}>Issuing Organization *</Label>
                  <Input {...register(`certifications.${index}.issuer`)} placeholder="Amazon Web Services" />
                  {errors.certifications?.[index]?.issuer && (
                    <p className="text-sm text-destructive">
                      {errors.certifications[index]?.issuer?.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`certifications.${index}.date`}>Date Obtained *</Label>
                <Input type="month" {...register(`certifications.${index}.date`)} max={getCurrentMonth()} />
                {errors.certifications?.[index]?.date && (
                  <p className="text-sm text-destructive">{errors.certifications[index]?.date?.message as string}</p>
                )}
              </div>
            </div>
          ))
        )}

        <Button type="button" variant="outline" onClick={addCertification} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </CardContent>
    </Card>
  )
}
