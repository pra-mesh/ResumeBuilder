import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PenBox, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

const Education = ({ form }: { form: any }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const [edit, setEdit] = useState(-1);
  const addEducation = () => {
    append({});
    setEdit(fields.length);
  };
  const removeEducation = (index = 0) => {
    remove(index);
  };
  const editEducation = (index = 0) => {
    setEdit(index);
  };
  const closeEducation = () => {
    setEdit(-1);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Education</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addEducation}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Education</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <Card key={field.id}>
              {index === edit ? (
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`education.${index}.degree`}
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Bachelor of Science, Master's, etc."
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.institution`}
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="University/College Name"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.course`}
                      render={({ field }) => (
                        <FormItem className="col-span-1 sm:col-span-2">
                          <FormLabel>Field of Study/Course</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Computer Science, Business Administration, etc."
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end justify-end-safe sm:col-span-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700 border-1 mr-5"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button type="button" onClick={closeEducation}>
                        Done
                      </Button>
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {form.getValues(`education.${index}.degree`) ||
                        "Not specified"}
                    </CardTitle>
                    <div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editEducation(index)}
                        className=""
                      >
                        <PenBox className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Education;
