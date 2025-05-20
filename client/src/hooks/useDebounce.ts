import { useEffect, useState } from "react";
export const useDebounce = (search: string, delay = 100) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(search);
    }, delay);
    return () => clearTimeout(timer);
  }, [search, delay]);
  return value;
};
