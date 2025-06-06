import type { Resume } from "@/types/resume";

const MinimalTemplate = (formData: Resume) => {
  return <div>{formData.toString()}</div>;
};

export default MinimalTemplate;
