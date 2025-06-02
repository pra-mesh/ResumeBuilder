"use client";

import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Calendar,
  ExternalLink,
} from "lucide-react";
import type { ResumeCoreSections } from "@/types/resumeProps";

export function ResumePreview() {
  const { watch } = useFormContext<ResumeCoreSections>();
  const formData = watch();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01"); // Add day to make it a valid date
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
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
    <Card>
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <CardDescription>
          Review your resume before saving. This is how your resume will look
          when exported.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg border">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {formData.personalInfo.fullName}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-4">
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
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {formData.personalInfo.website && (
                <div className="flex items-center gap-1 text-blue-600">
                  <Globe className="h-4 w-4" />
                  <span>{formData.personalInfo.website}</span>
                </div>
              )}
              {formData.personalInfo.linkedin && (
                <div className="flex items-center gap-1 text-blue-600">
                  <Linkedin className="h-4 w-4" />
                  <span>{formData.personalInfo.linkedin}</span>
                </div>
              )}
              {formData.personalInfo.github && (
                <div className="flex items-center gap-1 text-blue-600">
                  <Github className="h-4 w-4" />
                  <span>{formData.personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {formData.personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {formData.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Education */}
          {formData.educations && formData.educations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {formData.educations.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-gray-600">{edu.course}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {formData.experiences && formData.experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
                Work Experience
              </h2>
              <div className="space-y-6">
                {formData.experiences.map((exp, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-gray-700 font-medium">
                          {exp.company}
                        </p>
                        <p className="text-gray-600">{exp.location}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDateRange(
                          exp.startDate,
                          exp.endDate,
                          exp.current
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {formData.skills && formData.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-1 px-3"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {formData.projects && formData.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
                Projects
              </h2>
              <div className="space-y-6">
                {formData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-500 pl-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      {project.link && (
                        <div className="flex items-center text-sm text-blue-600">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          <span className="truncate max-w-xs">
                            {project.link}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {formData.certifications && formData.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
                Certifications
              </h2>
              <div className="space-y-4">
                {formData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-orange-500 pl-4"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {cert.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(cert.date)}
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {(!formData.experiences || formData.experiences.length === 0) &&
            (!formData.skills || formData.skills.length === 0) &&
            (!formData.projects || formData.projects.length === 0) &&
            (!formData.certifications ||
              formData.certifications.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg mb-2">
                  Additional sections will appear here when you add content.
                </p>
                <p className="text-sm">
                  Your resume currently includes Personal Information and
                  Education sections.
                </p>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
