// import { parseISO, format } from "date-fns"; // Import parseISO and format

type NonArrayTypes = object | string | number | null | undefined;

export const isEmpty = <T>(value: T[] | NonArrayTypes): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  switch (typeof value) {
    case "object":
      return value === null || Object.keys(value).length === 0;

    case "string":
      return value === "" || !value;

    default:
      return true;
  }
};

export const generateSimpleUID = (): string => {
  return Math.random().toString(36).substr(2, 16); // 16-character unique ID
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown"; // Handle empty or invalid dates

  // Extract the components from the input string
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  // Create the Date object in local time
  const date = new Date(year, month - 1, day, hour, minute, second);

  // Format time as "HH:mm" and date as "dd/MM/yyyy"
  return `${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })} ${date.toLocaleDateString("en-GB")}`;
};
