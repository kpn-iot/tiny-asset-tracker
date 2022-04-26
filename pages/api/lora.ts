// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { store } from "../../lib/store";

interface Data {
  status: string;
}

interface Line {
  n: string;
  v: number;
  vs: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const data: Line[] = req.body;

    try {
      const temp = data.find((item) => item.n === "temperature")?.v ?? -1;
      if (temp === -1) {
        const latitude = data.find((item) => item.n === "latitude")?.v ?? 0;
        const longitude = data.find((item) => item.n === "longitude")?.v ?? 0;
        // If there was no locTime supplied, fall back to current timestamp
        const locTime = data.find((item) => item.n === "locTime")?.vs ?? `${Date.now()}`;

        // console.log(data, "locTime", locTime);
        const logtimestamp = new Date().toLocaleString("nl-nl");
        const logMessage = `${logtimestamp} ${latitude},${longitude} [${locTime} ${new Date(
          parseInt(locTime, 10)
        ).toLocaleString("nl-nl")}]`;
        console.log("POST LORA=", logMessage);
        store.push({ loc: [latitude, longitude], time: locTime });
        console.log(store);
      } else {
        console.log("temp ignored");
      }
      res.status(200).json({ status: "POST OK" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "POST FAILED" });
    }
  } else {
    console.log("req.query", req.query, req.method);

    res.status(200).json({ status: "GET OK" });
  }
}
