import Web3Modal, { ICoreOptions } from "web3modal";
import { Network, Web3Provider } from "@ethersproject/providers";
import create from "zustand";
import shallow from "zustand/shallow";
import { useCallback, useEffect } from "react";

type WalletState = {
  provider?: Web3Provider;
  account?: Account;
  network?: Network;
  web3Modal?: Web3Modal;
};

const useWalletStore = create<WalletState>((_set) => ({
  provider: undefined,
  account: undefined,
  network: undefined,
  web3Modal: undefined,
}));

type Account = string;

type UseWalletResult = WalletState & {
  connect(opts?: Partial<ICoreOptions>): void;
  disconnect(): Promise<void>;
};

export function useWallet(): UseWalletResult {
  // Retrieve the current values from the store, and automatically re-render on updates
  const account = useWalletStore((state) => state.account, shallow);
  const network = useWalletStore((state) => state.network, shallow);
  const provider = useWalletStore((state) => state.provider, shallow);
  const web3Modal = useWalletStore((state) => state.web3Modal, shallow);

  useEffect(() => {
    useWalletStore.setState({ web3Modal: new Web3Modal() });
  }, []);

  const connect = useCallback(async (opts: Partial<ICoreOptions>) => {
    // Launch modal with the given options
    const web3Modal = new Web3Modal(opts);
    useWalletStore.setState({ web3Modal });
    const web3ModalProvider = await web3Modal.connect();

    // Set up Ethers provider and initial state with the response from the web3Modal
    const initialProvider = new Web3Provider(web3ModalProvider, "any");
    const getNetwork = () => initialProvider.getNetwork();
    const initialAccounts = await initialProvider.listAccounts();
    const initialNetwork = await getNetwork();

    useWalletStore.setState({
      provider: initialProvider,
      network: initialNetwork,
      account: initialAccounts[0],
    });

    // Set up event listeners to handle state changes
    web3ModalProvider.on("accountsChanged", (accounts: string[]) => {
      useWalletStore.setState({ account: accounts[0] });
    });

    web3ModalProvider.on("chainChanged", async (_chainId: string) => {
      const network = await getNetwork();
      useWalletStore.setState({ network });
    });

    web3ModalProvider.on("disconnect", () => {
      web3Modal.clearCachedProvider();
    });
  }, []);

  const disconnect = useCallback(async () => {
    web3Modal?.clearCachedProvider();
    useWalletStore.setState({
      provider: undefined,
      network: undefined,
      account: undefined,
    });
  }, [web3Modal]);

  return {
    connect,
    disconnect,
    provider,
    account,
    network,
    web3Modal,
  };
}
