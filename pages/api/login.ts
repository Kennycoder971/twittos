import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      throw new Error("Invalid Credentials");
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !user.hashedPassword) {
      throw new Error("Invalid Credentials");
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isCorrectPassword) {
      throw new Error("Invalid Credentials");
    }

    return res.status(200).json(user);
  } catch (error: any) {
    log(error);
    return res.status(400).json({ message: error.message });
  }
}
