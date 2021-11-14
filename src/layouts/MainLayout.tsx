import { FC } from "react";
import Head from "next/head";
import ConnectToWallet from "compounds/ConnectToWallet";
import { motion, Variants } from "framer-motion";

const MAIN_VARIANTS: Variants = {
  hidden: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};
const APPEAR_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  title?: string;
  subTitle?: string;
};

const MainLayout: FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>dApp Flow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="p-4 bg-indigo-600 text-white w-full">
        <div className="w-full max-w-2xl m-auto flex justify-between">
          <div>
            <h1 className="font-semibold">dApp Flow</h1>
            <sub>Low code /no code Web3 Automation</sub>
          </div>
          <div>
            <ConnectToWallet />
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <motion.div
          variants={MAIN_VARIANTS}
          initial="hidden"
          animate={"enter"}
          exit="exit"
          transition={{ type: "spring" }}
          className="relative w-full mx-auto md:p-12 p-6 max-w-xl md:border md:shadow-xl bg-white border-gray-200 rounded-2xl"
        >
          {(title || subTitle) && (
            <motion.div
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "linear", delay: 0.3 }}
              className="grid md:gap-6 gap-4 md:pb-8 pb-4"
              variants={APPEAR_VARIANTS}
            >
              {title && (
                <div className="text-dark text-center text-2xl font-medium md:px-12 px-8">
                  {title}
                </div>
              )}
              {subTitle && (
                <div className="grid text-muted text-center md:px-12">
                  {subTitle}
                </div>
              )}
            </motion.div>
          )}
          {children}
        </motion.div>
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
    </div>
  );
};

export default MainLayout;
