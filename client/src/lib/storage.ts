export const setItem = (key = "access_token", value: string) =>
  localStorage.setItem(key, value);

export const getItem = (key = "access_token") => {
  return localStorage.getItem(key);
};
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
export const removeAllItems = () => localStorage.clear();
