import EditableSection from "./forms/EditableSection";
import experienceFields from "./forms/experienceFields";

const Experience = ({ form }: { form: any }) => {
  const defaultItem = {
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  };

  return (
    <EditableSection
      form={form}
      title="Experience"
      name="experience"
      fieldConfig={experienceFields}
      defaultItem={defaultItem}
      header="company"
    />
  );
};

export default Experience;
