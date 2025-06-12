import { selectResumeByID } from "@/slices/resumes/resumeSelectors";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import ResumeView from "@/components/Resume/templates/ResumeView";

const PrintResume = () => {
  const { id } = useParams();
  const resume = useSelector(selectResumeByID(id ?? ""));
  if (!resume)
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-destructive">Failed to load resume.</p>
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to="/user"
              replace
            >
              Back to user List
            </Link>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto  px-4">
          <div className="max-w-4xl mx-auto">
            <ResumeView
              desc="Please select the template to be downloaded.This is how your resume will look when exported."
              resume={resume}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintResume;
