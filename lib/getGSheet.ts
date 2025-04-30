import { parse } from "csv-parse/sync";

export const getGSheet = async (
  spreadsheetId: string,
  sheetId: string,
  cache?: RequestCache,
  next?: NextFetchRequestConfig
) => {
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&id=${spreadsheetId}&gid=${sheetId}`,
    { cache: cache, next: next }
  );
  const data = await response.text();

  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });

  return records;
};
