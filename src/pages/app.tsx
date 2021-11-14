import { NextPage } from "next";
import { useRouter } from "next/router";

import MainLayout from "layouts/MainLayout";
import { useCallback } from "react";
import Button from "components/Button";

const AppIndex: NextPage = () => {
  const router = useRouter();
  const handleNewWorkflow = useCallback(() => {
    router.push("/workflows/new");
  }, [router]);

  return (
    <MainLayout>
      <Button onClick={handleNewWorkflow}>New Workflow</Button>
    </MainLayout>
  );
};

export default AppIndex;
