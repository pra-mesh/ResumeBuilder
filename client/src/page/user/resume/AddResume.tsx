import ResumeForm from "@/components/Resume/resume-form";

const AddResume = () => {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Resume</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to create a new resume.
        </p>
      </div>
      <ResumeForm />
    </div>
  );
};

export default AddResume;
