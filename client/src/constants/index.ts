export const Base_URL = import.meta.env.VITE_API_URL;
export const API_URL = Base_URL.concat("/api/v1");

export const URLS = {
  USERS: API_URL + "/users",
  Auth: API_URL + "/auth",
  RESUMES: API_URL + "/resumes",
};
