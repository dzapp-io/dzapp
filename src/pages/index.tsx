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
    <MainLayout title="Hello">
      {user.kind === "anonymous" && (
        <Button onClick={handleConnectWallet}>Connect Wallet</Button>
      )}
      {user.kind === "connected" && (
        <div className="grid gap-4">
          <Identicon size={64} account={user.address} className="bg-blue-500" />
          <Button onClick={handleGetStarted}>Lets go!</Button>
        </div>
      )}
    </MainLayout>
  );
}
