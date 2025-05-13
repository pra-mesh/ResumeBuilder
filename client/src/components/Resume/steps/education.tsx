import EditableSection from "./forms/EditableSection";
import educationFields from "./forms/educationFields";

const Education = ({ form }: { form: any }) => {
  const defaultItem = {
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    course: "",
  };
  return (
    <EditableSection
      form={form}
      title="Education"
      name="education"
      fieldConfig={educationFields}
      defaultItem={defaultItem}
      header="degree"
    />
  );
};

export default Education;
