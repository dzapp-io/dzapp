import { useEffect, useRef } from "react";
import { Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";

import { CONTRACT_NOT_VERIFIED } from "./etherscan";

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
