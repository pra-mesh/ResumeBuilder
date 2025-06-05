import { prompts } from "@/constants";
import { getAIResponse } from "@/services/ai-helpers";
import {
  useMutation,
  useQueryClient,
  // QueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

const generateAIText = async (payload: {
  query: string;
  section: string;
}): Promise<string> => {
  const prompt =
    payload.section === "project"
      ? prompts.Project
      : payload.section === "experience"
      ? prompts.Experience
      : prompts.Summary;
  const generatedSummary = await getAIResponse(`${prompt} ${payload.query}`);
  return generatedSummary;
};
//BUG: Error not showing
export const useGetAIText = () => {
  const queryClient = useQueryClient();
  //   new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 0, // Data is considered stale immediately
  //       refetchOnMount: true, // Refetch on mount
  //       refetchOnWindowFocus: true, // Refetch on window focus
  //       refetchOnReconnect: true, // Refetch on reconnect
  //     },
  //   },
  // });
  return useMutation({
    mutationFn: generateAIText,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["AItext"] });
      toast.success("Text Generated!", {
        description: "AI has generated a text for you.",
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to generate text. Please try again.",
      });
    },
  });
};

export const projectDesc = (project: {
  title?: string;
  description?: string;
  technologies?: string[];
  link?: string;
}): string => {
  const title = project.title ? `Title: ${project.title}` : "";
  const desc = project.description ? `Description: ${project.description}` : "";
  const tech = project.technologies?.length
    ? `Technologies: ${project.technologies.join(", ")}`
    : "";
  console.log(title);
  const finalDesc = [title, desc, tech].filter(Boolean).join(" | ");
  return finalDesc;
};

export const ExperienceDesc = (experience: {
  company?: string;
  position?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}): string => {
  const desc = [
    experience.company ? `Company: ${experience.company}` : "",
    experience.position ? `Position: ${experience.position}` : "",
    experience.location ? `Location: ${experience.location}` : "",
    experience.startDate ? `Start Date: ${experience.startDate}` : "",
    experience.endDate ? `End Date: ${experience.endDate}` : "",
    experience.current ? "Currently Working: Yes" : "",
  ];

  return desc.filter(Boolean).join(" | ");
};
