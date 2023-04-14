import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { print_provider_id } = req.body;
  const { blueprint_id } = req.body;
  const token = process.env.PRINTIFY_API;
  const pixel_printed = process.env.PRINTIFY_SHOP_ID;
  const bearer = "Bearer " + token;
  const url = `https://api.printify.com/v1/catalog/blueprints/${blueprint_id}/print_providers/${print_provider_id}/variants.json`;
  const config = {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json;charset=utf-8",
      "User-Agent": "NodeJS",
    },
  };

  await axios
    .get(url, config)
    .then(({ data }) => {
      res.status(200).json({ data });
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
}
