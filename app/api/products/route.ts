import { getGSheet } from "@/lib/getGSheet";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getGSheet(
    "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
    "0"
  );

  return NextResponse.json(products);
}
