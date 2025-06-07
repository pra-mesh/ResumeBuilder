import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (fullName: string | undefined) => {
  if (!fullName) return "";
  return fullName
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .join("");
};

export const longValue = ({
  text,
  length,
}: {
  text: string;
  length: number;
}) => {
  if (text.length < length) return text;
  else return text.slice(0, length - 1).concat("...");
};
