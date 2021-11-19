import { inferAsyncReturnType } from "@trpc/server";

import got from "got";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

import withSession from "lib/session";

type NextRequestWithSession = NextApiRequest & { session: Session };

type ContextConfig = {
  req: NextRequestWithSession;
  res: NextApiResponse<any>;
};

const createContextInner = async ({ req, res }: ContextConfig) => {
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
