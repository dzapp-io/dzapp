import { EtherscanProvider } from "@ethersproject/providers";
import { Networkish } from "@ethersproject/networks";
import ky from "ky";
import { useQuery } from "react-query";

const ETHERSCAN_API_KEY =
  process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY ?? "[missing api key]";

export const getEtherscanProvider = (network?: Networkish) =>
  new EtherscanProvider(network, ETHERSCAN_API_KEY);

const client = ky.extend({
  prefixUrl: "https://api.etherscan.io/api",
});

export type ContractABIResponse = {
  status: string;
  message: string;
  result: string;
};

export type ContractSourceResponse = {
  status: string;
  message: string;
  result: {
    SourceCode: string;
    ABI: string;
    ContractName: string;
    CompilerVersion: string;
    ConstructorArguments: string;
    EVMVersion: string;
    Library: string;
    Runs: string;
    Proxy: string;
    LicenseType: string;
    Implementation: string;
    SwarmSource: string;
  }[];
};

export const CONTRACT_NOT_VERIFIED = "Contract source code not verified";

export const contract = {
  async getContractABI(contractAddress: string) {
    try {
      const query = new URLSearchParams({
        module: "contract",
        action: "getabi",
        address: contractAddress,
        apikey: ETHERSCAN_API_KEY,
      }).toString();

      const { result } = await client
        .get(`?${query}`)
        .json<ContractABIResponse>();

      return result;
    } catch (error) {}
  },
  async getContractSource(contractAddress: string) {
    try {
      const query = new URLSearchParams({
        module: "contract",
        action: "getsourcecode",
        address: contractAddress,
        apikey: ETHERSCAN_API_KEY,
      }).toString();

      const { result: results } = await client
        .get(`?${query}`)
        .json<ContractSourceResponse>();

      if (results.length) {
        return results[0];
      }

      return null;
    } catch (error) {}
  },
};

export function useContractSourceQuery(contractAddress: string) {
  async function query() {
    return await contract.getContractSource(contractAddress);
  }

  return useQuery(["contract-source", { contractAddress }], query, {
    enabled: Boolean(contractAddress),
    staleTime: 60 * 60 * 1000,
  });
}

export function useContractABIeQuery(contractAddress: string) {
  async function query() {
    const abi = await contract.getContractABI(contractAddress);
    return abi;
  }

  return useQuery(["contract-abi", { contractAddress }], query, {
    enabled: Boolean(contractAddress),
    staleTime: 60 * 60 * 1000,
  });
}
