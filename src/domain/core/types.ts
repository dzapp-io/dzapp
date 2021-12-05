export type Web3User =
  | { kind: "anonymous" }
  | {
      kind: "connected";
      address: string;
    };
