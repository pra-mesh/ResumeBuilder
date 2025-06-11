import ResumeForm from "@/components/Resume/resume-form";
import { Card, CardContent } from "@/components/ui/card";
import { selectResumeByID } from "@/slices/resumes/resumeSelectors";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";

const EditResume = () => {
  const { id } = useParams();
  const resume = useSelector(selectResumeByID(id ?? ""));
  if (!resume) {
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
  }
  return (
    <div className="flex flex-col justify-center max-w-4xl m-auto  pt-2 pb-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Edit Resume</h1>
      </div>
      <ResumeForm mode="edit" defaultValues={resume} />
    </div>
  );
};

export default EditResume;
