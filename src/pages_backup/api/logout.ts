import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const isProd = process.env.NODE_ENV === "production";

  res.setHeader(
    "Set-Cookie",
    `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; ${
      isProd ? "Secure" : ""
    }`
  );

  return res.status(200).json({ success: true });
}
