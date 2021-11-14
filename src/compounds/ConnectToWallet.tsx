import { FC, useCallback } from "react";

import { useWeb3Auth } from "lib/hooks";
import Identicon from "components/Identicon";
import Button from "components/Button";

const ConnectToWallet: FC = () => {
  const { signin, user } = useWeb3Auth();

  const handleConnectWallet = useCallback(async () => {
    try {
      await signin();
    } catch (error) {
      console.log("failed to connect", error);
    }
  }, [signin]);

  return (
    <div className="grid place-items-center h-full">
      {user.kind === "connected" && (
        <div className="p-2 bg-blue-700 rounded-full flex items-center justify-center">
          <span className="px-2">0x...{user.address.slice(-5)}</span>
          <Identicon className="bg-blue-200" account={user.address} />
        </div>
      )}
      {user.kind === "anonymous" && (
        <Button onClick={handleConnectWallet}>Connect to Wallet</Button>
      )}
    </div>
  );
};

export default ConnectToWallet;
