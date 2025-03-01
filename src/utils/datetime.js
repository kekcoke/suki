import { DateTime } from "luxon";

export const convertNanoSecondsToDate = (nanoseconds, format) => {
  const milliseconds = nanoseconds / 1e6;
  const date = DateTime.fromMillis(milliseconds);

  return date.toFormat(format);
};
