import { useCallback, useEffect, useMemo, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { Web3Provider } from "@ethersproject/providers";
import { useMutation } from "react-query";

export function useWeb3Provider() {
  const [provider, setProvider] = useState<Web3Provider>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function task() {
      try {
        setIsLoading(true);
        const externalProvider = await detectEthereumProvider();
        if (externalProvider) {
          console.log(externalProvider);
          setProvider(new Web3Provider(externalProvider));
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
  }, []);

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
        return;
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
    if (resumeSession()) {
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
  }, [provider]);

  const { mutateAsync: signin, isLoading: isSigningIn } =
    useMutation(signinMutation);

  useEffect(() => {
    resumeSession();
  }, [resumeSession]);

  const isConnected = useMemo(() => user.kind === "connected", [user]);

  return {
    signin,
    isSigningIn,
    user,
    isConnected,
  };
}
