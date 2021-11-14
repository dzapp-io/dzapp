import { NextPage } from "next";
import { useRouter } from "next/router";

import MainLayout from "layouts/MainLayout";
import { useCallback } from "react";
import Button from "components/Button";

const AppIndex: NextPage = () => {
  const router = useRouter();
  const handleNewWorflow = useCallback(() => {
    router.push("/workflows/new");
  }, [router]);

  return (
    <MainLayout>
      <Button onClick={handleNewWorflow}>New Workflow</Button>
    </MainLayout>
  );
};

export default AppIndex;
