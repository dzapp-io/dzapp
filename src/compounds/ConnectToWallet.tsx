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
      {user.kind === "connected" && <Identicon account={user.address} />}
      {user.kind === "anonymous" && (
        <Button onClick={handleConnectWallet}>Connect to Wallet</Button>
      )}
    </div>
  );
};

export default ConnectToWallet;
