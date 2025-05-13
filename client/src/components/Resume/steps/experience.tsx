import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PenBox, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

const Experience = ({ form }: { form: any }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  const [edit, setEdit] = useState(-1);
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
    setEdit(fields.length);
  };
  const removeExperience = (index = 0) => {
    remove(index);
  };
  const editExperience = (index = 0) => {
    setEdit(index);
    console.log(form.getValues());
  };
  const closeExperience = () => {
    setEdit(-1);
  };
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Experience</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addExperience}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Experience</span>
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
                      name={`experience.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Company Name" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experience.${index}.position`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Job Title" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experience.${index}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="City, Country or Remote"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experience.${index}.startDate`}
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
                      name={`experience.${index}.current`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            {/* Changed from direct text to Label component */}
                            <Label>I currently work here</Label>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experience.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              disabled={form.watch(
                                `experience.${index}.current`
                              )}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experience.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Describe your responsibilities and achievements..."
                              className="min-h-[100px]"
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
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700 border-1 mr-5"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button type="button" onClick={closeExperience}>
                        Done
                      </Button>
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {form.getValues(`experience.${index}.company`) ||
                        "Not specified"}
                    </CardTitle>
                    <div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editExperience(index)}
                        className=""
                      >
                        <PenBox className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(index)}
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

export default Experience;
