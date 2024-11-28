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
