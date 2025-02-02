import sheets from "@googleapis/sheets";

export const GET = async () => {
  const sheet = sheets.sheets({
    version: "v4",
    auth: "AIzaSyCNWpeurAYM0XIS_U_t4OLmDXMa8MQi7Vs", // specify your API key here
  });

  const res = await sheet.spreadsheets.values.get({
    spreadsheetId: "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    range: "san_pham!A1:G11",
  });

  return Response.json(res.data.values);
};
