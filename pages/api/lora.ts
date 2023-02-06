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
      const temperature =
        data.find((item) => item.n === "temperature")?.v ?? null;
      const battery = data.find((item) => item.n === "battery")?.vs ?? null;
      const latitude = data.find((item) => item.n === "latitude")?.v ?? null;
      const longitude = data.find((item) => item.n === "longitude")?.v ?? null;
      const heading = data.find((item) => item.n === "heading")?.v ?? 0;

      if (latitude && longitude) {
        // If there was no locTime supplied, fall back to current timestamp
        const locTime =
          data.find((item) => item.n === "locTime")?.vs ?? `${Date.now()}`;
        const logtimestamp = new Date().toLocaleString("nl-nl");
        const logMessage = `${logtimestamp} ${latitude},${longitude} [${locTime} ${new Date(
          parseInt(locTime, 10)
        ).toLocaleString("nl-nl")}]`;
        console.log("POST LORA=", logMessage);
        store.push({
          loc: [latitude, longitude],
          time: locTime,
          battery,
          temperature,
        });
        console.log(store);
      } else {
        console.log("invalid coords ignored");
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
