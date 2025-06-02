const certificationFields = [
  {
    name: "name",
    label: "Certification Name",
    placeholder: "AWS Certified Solutions Architect, etc.",
    type: "text",
    className: "sm:col-span-2",
  },
  {
    name: "issuer",
    label: "Issuing Organization",
    placeholder: "Issuing Organization",
    type: "text",
    className: "sm:col-span-2",
  },
  { name: "date", label: "Date Issued", type: "date" },
];

export default certificationFields;
