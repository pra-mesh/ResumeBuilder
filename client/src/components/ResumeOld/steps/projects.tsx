import EditableSection from "./forms/EditableSection";

import projectFields from "./forms/projectFields";

const Projects = ({ form }: { form: any }) => {
  const defaultItem = {
    title: "",
    description: "",
    technologies: [],
    link: "",
  };

  return (
    <EditableSection
      form={form}
      title="Projects"
      name="projects"
      fieldConfig={projectFields}
      defaultItem={defaultItem}
      header="title"
    />
  );
};

export default Projects;
