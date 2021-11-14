import { FC } from "react";
import Head from "next/head";

const MainLayout: FC = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>dApp Flow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="p-4 bg-indigo-600 text-white w-full">
        <div className="w-full max-w-2xl m-auto">
          <h1 className="font-semibold">dApp Flow</h1>
          <sub>Low code /no code Web3 Automation</sub>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {children}
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
};

export default MainLayout;
