import { prompts } from "@/constants";
import { getAIResponse } from "@/services/ai-helpers";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
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
  const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Data is considered stale immediately
      refetchOnMount: true, // Refetch on mount
      refetchOnWindowFocus: true, // Refetch on window focus
      refetchOnReconnect: true, // Refetch on reconnect
    },
  },
});
  return useMutation({
    mutationFn: generateAIText,
    onSuccess: () => {
      // NOTES Invalidates the existing data and refetch it

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
