//FIXME Do not use skills with EditableSection wrapper
import EditableSection from "./forms/EditableSection";
import skillsFields from "./forms/skillsFields";

const Skills = ({ form }: { form: any }) => {
  const defaultItem = {
    name: "",
  };
  return (
    <EditableSection
      form={form}
      title="Skills"
      name="skills"
      fieldConfig={skillsFields}
      defaultItem={defaultItem}
      header="name"
    />
  );
};

export default Skills;
