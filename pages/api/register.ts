import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { email, password, name } = req.body;
    console.log(email, password, name);

    if (!email || !password) {
      throw new Error("Invalid Credentials");
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return res.status(201).json(user);
  } catch (error: any) {
    log(error);
    return res.status(400).json({ message: error.message });
  }
}
