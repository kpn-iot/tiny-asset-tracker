// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { store } from "../../lib/store";

interface Item {
  loc: [number, number];
  time: string;
}

type Data =
  | {
      status: "ONLY GET IS ALLOWED";
    }
  | {
      status: "GET OK";
      data: Item[];
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).json({ status: "ONLY GET IS ALLOWED" });
  } else {
    const coords = store;
    console.log("GET COORDS=", coords);

    res.status(200).json({ status: "GET OK", data: coords });
  }
}
