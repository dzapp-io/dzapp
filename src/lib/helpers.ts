import { getAddress } from "@ethersproject/address";

export const isAddress = (address: string) => {
  try {
    return Boolean(getAddress(address));
  } catch (error) {
    return false;
  }
};

export const truncateAddress = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-5)}`;
