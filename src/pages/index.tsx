import { useCallback } from "react";
import { useRouter } from "next/router";

import { useWeb3Auth } from "lib/hooks";
import MainLayout from "layouts/MainLayout";
import Button from "components/Button";

export default function Home() {
  const { signin, user, isSigningIn } = useWeb3Auth();
  const router = useRouter();

  const handleConnectWallet = useCallback(async () => {
    try {
      await signin();
    } catch (error) {
      console.log("failed to connect", error);
    }
  }, []);

  const handleGetStarted = useCallback(() => {
    router.push("/app");
  }, []);

  return (
    <MainLayout>
      {isSigningIn && <div>Loading...</div>}

      {user.kind === "anonymous" && (
        <button
          className="bg-indigo-600 text-white p-4 rounded-full font-semibold"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      )}
      {user.kind === "connected" && (
        <>
          <div>Hello, {user.address}</div>
          <Button onClick={handleGetStarted}>Get Started</Button>
        </>
      )}
    </MainLayout>
  );
}
