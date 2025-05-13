const projectFields = [
  {
    name: "title",
    label: "Project Title",
    placeholder: "Project Name",
    type: "text",
  },
  {
    name: "link",
    label: "Project Link",
    placeholder: "https://github.com/username/project",
    type: "text",
  },

  {
    name: "description",
    label: "Description",
    placeholder: "Describe your project, its purpose, and your role...",
    type: "textarea",
    className: "sm:col-span-2",
  },
  {
    name: "technologies",
    label: "Technologies used",
    placeholder: "Add a technology (e.g., React, Node.js)",
    type: "tagInput",
    className: "sm:col-span-2",
  },
];

export default projectFields;
