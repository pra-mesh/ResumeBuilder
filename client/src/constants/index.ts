export const Base_URL = import.meta.env.VITE_API_URL;
export const API_URL = Base_URL.concat("/api/v1");

export const URLS = {
  USERS: API_URL + "/users",
  Auth: API_URL + "/auth",
  RESUMES: API_URL + "/resumes",
  public: Base_URL + "/assets",
  Assistant: API_URL + "/assistant",
};

const prompt = (type: string): string => {
  return `We are working on ${type} section. Create/rewrite the summary section if provided. The details are provided now;`;
};
export const prompts = {
  Summary: prompt("summary"),
  Experience: prompt("experience"),
  Project: prompt("project"),
};
