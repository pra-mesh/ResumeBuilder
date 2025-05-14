import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import TagInput from "@/components/ui/tagInput";
const Skills = ({ form }: { form: any }) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Skills</h2>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TagInput
                  value={(field.value || []).map((item: any) => item.name)} 
                  onChange={
                    (tags: string[]) =>
                      field.onChange(tags.map((t) => ({ name: t }))) 
                  }
                  placeholder="Enter skills"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default Skills;
