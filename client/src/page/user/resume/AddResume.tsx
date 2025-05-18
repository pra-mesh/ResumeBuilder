import ResumeForm from "@/components/Resume/resume-form";

const AddResume = () => {
  return (
    <div className="flex flex-col justify-center max-w-4xl m-auto  pt-2 pb-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Create New Resume</h1>
      </div>
      <ResumeForm />
    </div>
  );
};

export default AddResume;
