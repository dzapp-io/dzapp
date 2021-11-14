import { FC } from "react";
import Head from "next/head";

const MainLayout: FC = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>dApp Flow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {children}
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
};

export default MainLayout;
