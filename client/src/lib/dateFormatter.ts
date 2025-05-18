import { DateTime } from "luxon";

export const formatDate = (date: string, format = "D", locale = "en") => {
  return DateTime.fromISO(date).setLocale(locale).toFormat(format);
};
