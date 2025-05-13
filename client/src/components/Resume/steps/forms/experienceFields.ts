const experienceFields = [
  { name: "company", label: "Company", placeholder: "Company Name", type: "text" },
  { name: "position", label: "Position", placeholder: "Job Title", type: "text" },
  { name: "location", label: "Location", placeholder: "City or Remote", type: "text" },
  { name: "startDate", label: "Start Date", type: "date" },
  {
    name: "current",
    label: "I currently work here",
    type: "checkbox",
  },
  {
    name: "endDate",
    label: "End Date",
    type: "date",
    disabled: (form: any, index: number) => form.watch(`experience.${index}.current`),
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Describe responsibilities...",
    type: "textarea",
    className: "sm:col-span-2",
  },
];

export default experienceFields;