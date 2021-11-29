import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3Modal from "web3modal";

import { CONTRACT_NOT_VERIFIED } from "./etherscan";

const PROVIDER_OPTIONS = {
  injected: {
    package: "",
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // required
    },
  },
};

export function useWeb3Provider() {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function task() {
      try {
        setIsLoading(true);
        const externalProvider = await detectEthereumProvider();

        if (externalProvider) {
          const provider = new Web3Provider(
            externalProvider as ExternalProvider
          );

          setProvider(provider);

          provider.on("accountsChanged", (accounts: string[]) => {
            console.log("accountsChanged", accounts);
          });

          // Subscribe to chainId change
          provider.on("chainChanged", (chainId: number) => {
            console.log("chainChanged", chainId);
          });

          // Subscribe to provider connection
          provider.on("connect", (info: { chainId: number }) => {
            console.log("connect", info);
          });

          // Subscribe to provider disconnection
          provider.on(
            "disconnect",
            (error: { code: number; message: string }) => {
              console.log("disconnect", error);
            }
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!provider) {
      task();
    }
  }, [provider]);

  const handleTryConnect = useCallback(async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: PROVIDER_OPTIONS,
      });
      const externalProvider = await web3Modal.connect();

      if (externalProvider) {
        const provider = new Web3Provider(externalProvider as ExternalProvider);
        setProvider(provider);
        return provider;
      }
    } catch (error) {
      console.log("Failed to connect to web3");
      return null;
    }
  }, []);

  const isError = useMemo(() => Boolean(error), [error]);

  return {
    provider,
    error,
    isError,
    isLoading,
    tryConnect: handleTryConnect,
  };
}

export type Web3User =
  | { kind: "anonymous" }
  | {
      kind: "connected";
      address: string;
    };

export function useWeb3Auth() {
  const [user, setUser] = useState<Web3User>({ kind: "anonymous" });
  const { provider, tryConnect } = useWeb3Provider();

  const resumeSession = useCallback(async () => {
    try {
      if (!provider) {
        console.log("no provider detected");

        return false;
      }

      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setUser({
        kind: "connected",
        address,
      });
      return true;
    } catch (error) {
      return false;
    }
  }, [provider]);

  const signinMutation = useCallback(async () => {
    const resumed = await resumeSession();

    if (resumed) {
      return;
    }

    try {
      const $provider = provider || (await tryConnect());
      if ($provider) {
        await $provider.send("eth_requestAccounts", []);
        const signer = $provider.getSigner();
        const address = await signer.getAddress();
        setUser({
          kind: "connected",
          address,
        });
      }
    } catch (error) {
      console.log("failed to connect", error);
    }
  }, [provider, resumeSession, tryConnect]);

  const { mutateAsync: signin, isLoading: isSigningIn } =
    useMutation(signinMutation);

  useEffect(() => {
    resumeSession();
  }, [provider, resumeSession]);

  const isConnected = useMemo(() => user.kind === "connected", [user]);

  return {
    signin,
    isSigningIn,
    user,
    isConnected,
  };
}

export function useContract(address: string, abi: string) {
  const contractRef = useRef<Contract | null>(null);

  useEffect(() => {
    if (!address || !abi || abi === CONTRACT_NOT_VERIFIED) {
      return;
    }

    if (!contractRef.current) {
      contractRef.current = new Contract(address, abi);
    }
  }, [abi, address, contractRef]);

  return contractRef.current;
}
