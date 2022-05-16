import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

export default function withSession<TRes>(handler: NextApiHandler<TRes>) {
  return withIronSessionApiRoute(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD ?? "",
    cookieName: "lb-merchant",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production",
    },
  });
}
