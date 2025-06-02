import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PersonalInfo = ({ form }: { form: any }) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-2xl">Personal Information</CardTitle>
        <CardDescription>
          Add your contact and social media information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="personalInfo.address"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="City, State, Country" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalInfo.github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="github.com/username" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personalInfo.linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="linkedin.com/in/username" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personalInfo.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="9800000000" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personalInfo.website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="yourwebsite.com" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Professional Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Experienced software developer with 5+ years of experience in web development..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  Tip: Keep your summary concise (3-5 sentences) and focused on
                  your most relevant qualifications.
                </p>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
