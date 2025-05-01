import { normalizeString } from "./normalizeString";

const createSlug = (text: string) => {
  return normalizeString(text).replace(/\s+/g, "-");
};

export default createSlug;
