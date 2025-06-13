import ResumeForm from "@/components/Resume/resume-form";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchResume } from "@/hooks/useResume";
import { Link, useLocation, useParams } from "react-router";

const EditResume = () => {
  const location = useLocation();
  const { id } = useParams();
  const { type } = location.state;
  const resume = useFetchResume(id ?? "", type);

  if (!resume) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-destructive">Failed to load resume.</p>
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to="/user/resumes"
              replace
            >
              Back to Resume List
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
