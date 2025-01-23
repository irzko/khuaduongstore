"use client";

import { getGSheet } from "@/lib/getGSheet";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getGSheet(
        "1m4aKkR43kNsNPmB1GUa1g5LI3l8SzK5iaBDH9uDERFY",
        "0"
      );
      setData(res);
    };
    fetchData();
  }, []);

  console.log(data);

  return <div>Page</div>;
}
