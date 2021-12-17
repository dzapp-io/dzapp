import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Provider,
  Web3Provider,
  ExternalProvider,
} from "@ethersproject/providers";
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

export function useWeb3Modal() {
  return new Web3Modal({
    cacheProvider: true,
    providerOptions: PROVIDER_OPTIONS,
  });
}

export function useWeb3Provider() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const providerRef = useRef<Web3Provider>();

  const handleAccountChanged = useCallback((accounts: string[]) => {
    console.log("accounts changed:", accounts);
  }, []);

  const handleChainChanged = useCallback((chainId: number) => {
    console.log("chain changed:", chainId);
  }, []);

  const handleConnect = useCallback((info: { chainId: number }) => {
    console.log("connect", info);
  }, []);

  const handleDisconnect = useCallback(
    (error: { code: number; message: string }) => {
      console.log("disconnect", error);
    },
    []
  );

  const unregisterListeners = useCallback(
    (provider: Web3Provider) => {
      provider.removeListener("accountsChanged", handleAccountChanged);
      provider.removeListener("chainChanged", handleChainChanged);
      provider.removeListener("connect", handleConnect);

      console.log("web3: unregistered listeners");
    },
    [handleAccountChanged, handleChainChanged, handleConnect]
  );

  const registerListeners = useCallback(
    (provider: Web3Provider) => {
      console.log(provider._events);
      provider.on("accountsChanged", handleAccountChanged);

      // Subscribe to chainId change
      provider.on("chainChanged", handleChainChanged);

      // Subscribe to provider connection
      provider.on("connect", handleConnect);

      // Subscribe to provider disconnection
      provider.on("disconnect", handleDisconnect);

      console.log("web3: registered listeners");
    },
    [handleAccountChanged, handleChainChanged, handleConnect, handleDisconnect]
  );

  useEffect(() => {
    async function task() {
      try {
        setIsLoading(true);
        const externalProvider = await detectEthereumProvider();

        if (externalProvider) {
          const provider = new Web3Provider(
            externalProvider as ExternalProvider
          );

          registerListeners(provider);

          providerRef.current = provider;
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!providerRef.current) {
      task();
    }
  }, [providerRef, registerListeners]);

  useEffect(() => {
    if (providerRef.current) {
      registerListeners(providerRef.current);
    }

    return () => {
      if (providerRef.current) {
        unregisterListeners(providerRef.current);
      }
    };
  }, [providerRef, registerListeners, unregisterListeners]);

  const handleTryConnect = useCallback(async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: PROVIDER_OPTIONS,
      });

      const externalProvider = await web3Modal.connect();

      if (externalProvider) {
        const provider = new Web3Provider(externalProvider as ExternalProvider);
        providerRef.current = provider;
        return provider;
      }
    } catch (error) {
      console.log("Failed to connect to web3");
      return null;
    }
  }, []);

  const isError = useMemo(() => Boolean(error), [error]);

  return {
    provider: providerRef.current,
    error,
    isError,
    isLoading,
    tryConnect: handleTryConnect,
  };
}

export function useContract(address: string, abi: string, provider?: Provider) {
  const contractRef = useRef<Contract | null>(null);

  useEffect(() => {
    if (!address || !abi || abi === CONTRACT_NOT_VERIFIED) {
      return;
    }

    if (!contractRef.current) {
      contractRef.current = new Contract(address, abi, provider);
    }
  }, [abi, address, contractRef, provider]);

  return contractRef.current;
}
