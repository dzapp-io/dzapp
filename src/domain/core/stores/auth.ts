import { createStore } from "lib/zustand";

import { Web3User } from "../types";

const INITIAL_STATE = {
  user: {
    kind: "anonymous",
  } as Web3User,
};

export type AuthState = typeof INITIAL_STATE;

export const useAuthStore = createStore(INITIAL_STATE, (set) => ({
  setUser(user: Web3User) {
    set((store) => {
      store.state.user = user;
    });
  },
  reset() {
    set((store) => {
      store.state = INITIAL_STATE;
    });
  },
}));
