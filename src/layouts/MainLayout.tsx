import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

import ConnectToWallet from "compounds/ConnectToWallet";
import Logo from "components/Logo";
import Box from "components/Box";

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
        <title>dZApp - Web3 automation made simple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center w-full flex-1 md:px-12 px-4 text-center bg-gray-800">
        <motion.div
          variants={MAIN_VARIANTS}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "spring" }}
          className="relative w-full mx-auto max-w-xl"
        >
          <Box className="p-12 my-8 w-full md:ring md:shadow-xl bg-gray-900 text-purple-200 ring-purple-700/80 rounded-2xl">
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
          </Box>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

export const Header = () => {
  return (
    <header className="p-4 md:py-6 bg-gray-900 text-gray-300 w-full border-b-2 border-purple-500">
      <div className="w-full max-w-2xl m-auto flex justify-between">
        <div>
          <h1>
            <Link href="/">
              <a>
                <Logo size="md" />
              </a>
            </Link>
          </h1>
          <sub className="text-sm text-purple-200">
            Web3 automation made simple
          </sub>
        </div>
        <div>
          <ConnectToWallet />
        </div>
      </div>
    </header>
  );
};

export const Footer = () => (
  <footer className="flex items-center justify-center w-full h-24 border-t-2 border-purple-500 bg-gray-900 text-purple-200">
    <span className="font-display">
      &copy;{new Date().getFullYear()} / <Logo size="sm" />
    </span>
  </footer>
);
