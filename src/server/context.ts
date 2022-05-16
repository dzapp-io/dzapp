import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import got from "got";

export async function createContext(opts?: CreateNextContextOptions) {
  return {
    req: opts?.req,
    res: opts?.res,
    got,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
