import type { Resume } from "@/types/resume";
const ClassicTemplates = (formData: Resume) => {
  return <div>{formData.toString()}</div>;
};

export default ClassicTemplates;
