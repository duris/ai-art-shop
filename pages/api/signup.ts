import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await prisma.user
    .create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    })
    .then(() => res.status(200).send(`Thanks for signing up!`)) //TODO: Send Welcome Email
    .catch((err) => res.status(400).json("Unable to register"));
}
