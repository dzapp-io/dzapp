import { FC, useCallback, useEffect } from "react";

import { truncateAddress } from "lib/helpers";

import Identicon from "components/Identicon";
import Button from "components/Button";

const ConnectToWallet: FC<{ account?: string; onConnect?: () => void }> = ({
  account,
  onConnect,
}) => {
  return (
    <div className="grid place-items-center h-full">
      {account ? (
        <div className="p-2 bg-purple-700 rounded-full flex items-center justify-center">
          <span className="px-2">{truncateAddress(account)}</span>
          <Identicon className="bg-purple-200" account={account} />
        </div>
      ) : (
        <Button onClick={onConnect}>Connect to Wallet</Button>
      )}
    </div>
  );
};

export default ConnectToWallet;
