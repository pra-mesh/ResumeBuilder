import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TagInput from "@/components/ui/tagInput";

const FieldRenderer = ({ form, index, fieldConfig, baseName }: any) => {
  return fieldConfig.map((field: any, i: number) => (
    <FormField
      key={i}
      control={form.control}
      name={`${baseName}.${index}.${field.name}`}
      render={({ field: rhfField }) => (
        <FormItem className={field.className || ""}>
          {field.type !== "checkbox" && <FormLabel>{field.label}</FormLabel>}
          <FormControl>
            {field.type === "text" ? (
              <Input {...rhfField} placeholder={field.placeholder} />
            ) : field.type === "date" ? (
              <Input
                {...rhfField}
                type="date"
                disabled={field.disabled?.(form, index)}
              />
            ) : field.type === "textarea" ? (
              <Textarea
                {...rhfField}
                placeholder={field.placeholder}
                className="min-h-[100px]"
              />
            ) : field.type === "checkbox" ? (
              <div className="flex items-start gap-2 pt-2">
                <Checkbox
                  {...rhfField}
                  checked={rhfField.value}
                  onCheckedChange={rhfField.onChange}
                />
                <Label>{field.label}</Label>
              </div>
            ) : field.type === "tagInput" ? (
              <TagInput
                {...rhfField}
                value={rhfField.value}
                onChange={rhfField.onChange}
                placeholder={field.placeholder}
              />
            ) : (
              <></>
            )}
          </FormControl>
        </FormItem>
      )}
    />
  ));
};

export default FieldRenderer;
