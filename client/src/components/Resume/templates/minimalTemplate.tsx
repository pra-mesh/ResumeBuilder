// client/src/components/Resume/templates/minimalTemplate.tsx
import type { Resume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const MinimalTemplate = (formData: Resume) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01"); // Add day to make it a valid date
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const formatDateRange = (
    startDate: string,
    endDate: string,
    current = false
  ) => {
    const start = formatDate(startDate);
    const end = current ? "Present" : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg border font-sans text-gray-800">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column (Sidebar) */}
        <div className="md:w-1/3 space-y-6">
          {/* Personal Info - Name */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {formData.personalInfo.fullName}
            </h1>
            {formData.personalInfo.summary && (
              <p className="text-sm text-gray-700 leading-relaxed">
                {formData.personalInfo.summary}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">
              Contact
            </h2>
            {formData.personalInfo.email && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="h-4 w-4 text-gray-600" />
                <span>{formData.personalInfo.email}</span>
              </div>
            )}
            {formData.personalInfo.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="h-4 w-4 text-gray-600" />
                <span>{formData.personalInfo.phone}</span>
              </div>
            )}
            {formData.personalInfo.address && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span>{formData.personalInfo.address}</span>
              </div>
            )}
            {formData.personalInfo.website && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Globe className="h-4 w-4" />
                <a
                  href={formData.personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Website
                </a>
              </div>
            )}
            {formData.personalInfo.linkedin && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <LinkedInLogoIcon className="h-4 w-4" />
                <a
                  href={formData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            )}
            {formData.personalInfo.github && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <GitHubLogoIcon className="h-4 w-4" />
                <a
                  href={formData.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </div>
            )}
          </section>

          {/* Skills */}
          {formData.skills && formData.skills.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Skills
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {formData.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column (Main Content) */}
        <div className="md:w-2/3 space-y-6">
          {/* Education */}
          {formData.education && formData.education.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Education
              </h2>
              {formData.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {edu.degree} in {edu.course}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                </div>
              ))}
            </section>
          )}

          {/* Experience */}
          {formData.experience && formData.experience.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Experience
              </h2>
              {formData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {exp.position} at {exp.company}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{exp.location}</p>
                  <p className="text-sm text-gray-700 leading-snug whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {formData.projects && formData.projects.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Projects
              </h2>
              {formData.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> View Project
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-snug mb-1 whitespace-pre-line">
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Technologies:</span>{" "}
                      {project.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {formData.certifications && formData.certifications.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">
                Certifications
              </h2>
              {formData.certifications.map((cert, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {cert.name}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {formatDate(cert.date)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      {/* Empty State */}
      {(!formData.experience || formData.experience.length === 0) &&
        (!formData.skills || formData.skills.length === 0) &&
        (!formData.projects || formData.projects.length === 0) &&
        (!formData.certifications || formData.certifications.length === 0) &&
        (!formData.education || formData.education.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-2">
              Additional sections will appear here when you add content.
            </p>
            <p className="text-sm">
              Your resume currently includes Personal Information.
            </p>
          </div>
        )}
    </div>
  );
};

export default MinimalTemplate;
