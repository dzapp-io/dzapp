import { ICoreOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const WEB3MODAL_OPTIONS: Partial<ICoreOptions> = {
  cacheProvider: true,
  providerOptions: {
    injected: {
      package: "",
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // required
      },
    },
  },
};
