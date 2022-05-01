export const objectToMap = (obj: Object): Map<any, any> => {
  return new Map(
    Array.from(Object.entries(obj), ([k, v]) =>
      v instanceof Object ? [k, objectToMap(v)] : [k, v]
    )
  );
};

export const mapToObject = (map: Map<any, any>): Object => {
  return Object.fromEntries(
    Array.from(map.entries(), ([k, v]) =>
      v instanceof Map ? [k, mapToObject(v)] : [k, v]
    )
  );
};

export const firestoreAutoId = (): string => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let autoId = "";

  for (let i = 0; i < 20; i += 1) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

export const convertCamelToTitleCase = (str: string): string => {
  let result = str.replace(/([A-Z])/g, " $1");
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
};

export const camelize = (str: string): string => {
  if (!str) {
    return null;
  }
  const word = str.toLowerCase();
  return word
    .replace(/(?:^\w|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};
