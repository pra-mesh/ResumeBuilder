import type { Resume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const ClassicTemplates = (formData: Resume) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01");
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
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg  font-sans text-gray-800">
      {/* Header Section */}
      <div className="text-center mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {formData.personalInfo.fullName}
        </h1>
        <p className="text-xl text-gray-600 mb-4">{formData.title}</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {formData.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{formData.personalInfo.email}</span>
            </div>
          )}
          {formData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{formData.personalInfo.phone}</span>
            </div>
          )}
          {formData.personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{formData.personalInfo.address}</span>
            </div>
          )}
          {formData.personalInfo.website && (
            <a
              href={formData.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <Globe className="h-4 w-4" />
              <span>Website</span>
            </a>
          )}
          {formData.personalInfo.linkedin && (
            <a
              href={formData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <LinkedInLogoIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {formData.personalInfo.github && (
            <a
              href={formData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <GitHubLogoIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Summary, Skills */}
        <div className="col-span-2 space-y-8">
          {/* Professional Summary */}
          {formData.personalInfo.summary && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {formData.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {formData.experience && formData.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-1 border-b border-gray-300">
                Work Experience
              </h2>
              <div className="space-y-6">
                {formData.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-gray-700 font-medium">
                          {exp.company} - {exp.location}
                        </p>
                      </div>
                      <span className="text-sm text-gray-600">
                        {formatDateRange(
                          exp.startDate,
                          exp.endDate,
                          exp.current
                        )}
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                      {exp.description
                        .split("\n")
                        .map(
                          (item, i) =>
                            item.trim() && <li key={i}>{item.trim()}</li>
                        )}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {formData.projects && formData.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-1 border-b border-gray-300">
                Projects
              </h2>
              <div className="space-y-6">
                {formData.projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" /> View Project
                        </a>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-2 text-justify">
                      {project.description}
                    </p>
                    {project.technologies.length > 0 && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Technologies:</span>{" "}
                        {project.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Education, Certifications, Skills */}
        <div className="col-span-1 space-y-8">
          {/* Education */}
          {formData.education && formData.education.length > 0 && (
            <section>
              <h2 className="text-sm sm:text-xl font-bold text-gray-900 mb-4 pb-1 border-b border-gray-300">
                Education
              </h2>
              <div className="space-y-4">
                {formData.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-gray-600 text-sm">{edu.course}</p>
                    <span className="text-sm text-gray-600">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {formData.skills && formData.skills.length > 0 && (
            <section>
              <h2 className="text-sm sm:text-xl font-bold text-gray-900 mb-4 pb-1 border-b border-gray-300">
                Skills
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {formData.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {formData.certifications && formData.certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-1 border-b border-gray-300">
                Certifications
              </h2>
              <div className="space-y-4">
                {formData.certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cert.name}
                    </h3>
                    <p className="text-gray-700">{cert.issuer}</p>
                    <span className="text-sm text-gray-600">
                      {formatDate(cert.date)}
                    </span>
                  </div>
                ))}
              </div>
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

export default ClassicTemplates;
