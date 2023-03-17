import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);
    res.status(200).json(currentUser);
  } catch (error: any) {
    res.status(405).end(error.message || error);
  }
}
