import { createStore } from "lib/zustand";

export type Web3User =
  | { kind: "anonymous" }
  | {
      kind: "connected";
      address: string;
    };

export type AuthState = {
  user: Web3User;
};

const INITIAL_STATE: AuthState = {
  user: {
    kind: "anonymous",
  },
};

export const useAuthStore = createStore(INITIAL_STATE, (set) => ({
  setUser(user: Web3User) {
    set((store) => {
      store.state.user = user;
    });
  },
}));
