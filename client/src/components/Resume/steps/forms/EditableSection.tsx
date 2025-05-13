import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenBox, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import FieldRenderer from "./FieldRenderer";

const EditableSection = ({
  form,
  name,
  title,
  defaultItem,
  fieldConfig,
  header,
}: {
  form: any;
  name: string;
  title: string;
  defaultItem: object;
  fieldConfig: any;
  header:string;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });
  const [editIndex, setEditIndex] = useState<number>(-1);

  const addItem = () => {
    append(defaultItem);
    setEditIndex(fields.length);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add {title}</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <Card key={field.id}>
              {index === editIndex ? (
                <CardContent className="grid gap-4 sm:grid-cols-2 space-y-3">
                  <FieldRenderer
                    form={form}
                    index={index}
                    fieldConfig={fieldConfig}
                    baseName={name}
                  />
                  <div className="flex items-end justify-end-safe sm:col-span-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 border-1 mr-5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button type="button" onClick={() => setEditIndex(-1)}>
                      Done
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {form.getValues(`${name}.${index}.${header}`) ||
                        "Not specified"}
                    </CardTitle>
                    <div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditIndex(index)}
                        className=""
                      >
                        <PenBox className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
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

export default EditableSection;
