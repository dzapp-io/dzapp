import { getAddress } from "@ethersproject/address";

export const isAddress = (address: string) => {
  try {
    return Boolean(getAddress(address));
  } catch (error) {
    return false;
  }
};
