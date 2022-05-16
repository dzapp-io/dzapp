import { inferAsyncReturnType } from "@trpc/server";
import got from "got";
import { IronSession } from "iron-session";
import withSession from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

type NextRequestWithSession = NextApiRequest & { session: IronSession };

const createContextInner = async (
  req: NextRequestWithSession,
  res: NextApiResponse
) => {
  return {
    req,
    res,
    got,
    session: req.session,
  };
};

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = withSession(createContextInner);

export type Context = inferAsyncReturnType<typeof createContextInner>;
