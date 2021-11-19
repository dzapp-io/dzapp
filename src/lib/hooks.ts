import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "react-query";

import { Web3Provider, ExternalProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";

import Web3Modal from "web3modal";

const providerOptions = {
  /* See Provider Options Section */
};

export function useWeb3Provider() {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function task() {
      try {
        const web3Modal = new Web3Modal({
          network: "mainnet", // optional
          cacheProvider: true, // optional
          providerOptions, // required
        });

        setIsLoading(true);
        const externalProvider = await web3Modal.connect();
        if (externalProvider) {
          setProvider(new Web3Provider(externalProvider as ExternalProvider));
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

  const isError = useMemo(() => Boolean(error), [error]);

  return {
    provider,
    error,
    isError,
    isLoading,
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
  const { provider } = useWeb3Provider();

  const resumeSession = useCallback(async () => {
    try {
      if (!provider) {
        console.log("no provider");
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

    if (resumed || !provider) {
      return;
    }

    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUser({
        kind: "connected",
        address,
      });
    } catch (error) {
      console.log("failed to connect", error);
    }
  }, [provider, resumeSession]);

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
    if (!address || !abi) {
      return;
    }
    if (!contractRef.current) {
      contractRef.current = new Contract(address, abi);
    }
  }, [abi, address, contractRef]);

  return contractRef.current;
}
