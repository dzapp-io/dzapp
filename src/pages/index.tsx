import { useCallback } from "react";
import { useRouter } from "next/router";

import { useWeb3Auth } from "lib/hooks";
import MainLayout from "layouts/MainLayout";
import Button from "components/Button";
import Identicon from "components/Identicon";

export default function Home() {
  const { signin, user, isSigningIn } = useWeb3Auth();
  const router = useRouter();

  const handleConnectWallet = useCallback(async () => {
    try {
      await signin();
    } catch (error) {
      console.log("failed to connect", error);
    }
  }, [signin]);

  const handleGetStarted = useCallback(() => {
    router.push("/app");
  }, [router]);

  return (
    <MainLayout>
      {isSigningIn && <div>Loading...</div>}

      {user.kind === "anonymous" && (
        <Button onClick={handleConnectWallet}>Connect Wallet</Button>
      )}
      {user.kind === "connected" && (
        <div className="grid gap-2">
          <div>
            <Identicon account={user.address} />
          </div>
          <Button onClick={handleGetStarted}>Get Started</Button>
        </div>
      )}
    </MainLayout>
  );
}
