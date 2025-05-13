import certificationFields from "./forms/certificationFeilds";
import EditableSection from "./forms/EditableSection";

const Certifications = ({ form }: { form: any }) => {
  const defaultItem = {
    name: "",
    issuer: "",
    date: "",
  };
  return (
    <EditableSection
      form={form}
      title="Certifications"
      name="certification"
      fieldConfig={certificationFields}
      defaultItem={defaultItem}
      header="name"
    />
  );
};

export default Certifications;
