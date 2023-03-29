import { NextApiRequest, NextApiResponse } from "next";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.body.prompt === "string") {
    console.log("getting prompt", req.body.promp);
    const response = await openai.createImage({
      prompt: `${req.body.prompt}`,
      n: 1,
      size: "1024x1024",
    });

    res.status(200).json({ text: response.data.data[0].url });
  } else {
    res.status(400).json({
      error: "Must enter text",
    });
  }
}
