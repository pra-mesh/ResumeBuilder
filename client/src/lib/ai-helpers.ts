// Mock AI service - replace with actual AI API calls
export async function generateProfessionalSummary(personalInfo: {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  github: string;
  linkedin: string;
  address: string;
  website?: string;
}): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock AI-generated summary based on available info
  const name = personalInfo.fullName || "Professional";
  const hasGithub = personalInfo.github ? "with strong technical portfolio" : "";
  const hasLinkedIn = personalInfo.linkedin ? "and proven networking capabilities" : "";

  return `Experienced ${
    name.split(" ")[0]
  } ${hasGithub} ${hasLinkedIn}. Passionate about delivering high-quality solutions and driving innovation. Proven track record of collaborating effectively with cross-functional teams to achieve project goals. Committed to continuous learning and staying current with industry best practices and emerging technologies.`;
}

export async function generateExperienceDescription(experience: {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock AI-generated description based on role and company
  const role = experience.position.toLowerCase();
  const company = experience.company;

  let description = `• Led key initiatives at ${company} in the ${experience.position} role\n`;

  if (role.includes("engineer") || role.includes("developer")) {
    description += `• Developed and maintained scalable applications using modern technologies\n`;
    description += `• Collaborated with cross-functional teams to deliver high-quality software solutions\n`;
    description += `• Participated in code reviews and implemented best practices for development workflows`;
  } else if (role.includes("manager") || role.includes("lead")) {
    description += `• Managed and mentored team members to achieve project deliverables\n`;
    description += `• Coordinated with stakeholders to define project requirements and timelines\n`;
    description += `• Implemented process improvements that increased team efficiency by 25%`;
  } else if (role.includes("analyst") || role.includes("consultant")) {
    description += `• Analyzed complex business requirements and provided strategic recommendations\n`;
    description += `• Created detailed reports and presentations for executive leadership\n`;
    description += `• Collaborated with clients to identify opportunities for process optimization`;
  } else {
    description += `• Executed key responsibilities with attention to detail and quality\n`;
    description += `• Contributed to team success through effective collaboration and communication\n`;
    description += `• Supported organizational goals through dedicated performance and initiative`;
  }

  return description;
}

export async function generateProjectDescription(project: {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock AI-generated description based on project info
  const title = project.title;
  const techs = project.technologies.join(", ");
  const hasLink = project.link ? "with live deployment" : "";

  return `${title} is a comprehensive application ${hasLink} built using ${techs}. This project demonstrates proficiency in modern development practices including responsive design, user experience optimization, and scalable architecture. Key features include intuitive user interface, robust data management, and seamless integration with external services. The project showcases problem-solving skills and attention to both technical excellence and user needs.`;
}
