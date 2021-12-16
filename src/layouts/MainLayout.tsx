import { FC, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

import styled from "lib/styled";
import { useWeb3Auth } from "lib/hooks";
import ConnectToWallet from "compounds/ConnectToWallet";
import Logo from "components/Logo";
import Box from "components/Box";
import Button from "components/Button";

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

export const MainLayout: FC<Props> = ({ children, title, subTitle }) => {
  const { user } = useWeb3Auth();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-bluegray to-nearblack text-white">
      <Head>
        <title>dZApp - Web3 automation made simple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        {user.kind === "connected" && (
          <Link href="/workflows">
            <a>
              <Button size="lg">+ workflow</Button>
            </a>
          </Link>
        )}
        <ConnectToWallet />
      </Header>
      <main className="flex flex-col items-center justify-center w-full flex-1 md:px-12 px-4 text-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export const AnimatedCardLayout: FC<Props> = ({ children, ...props }) => {
  return (
    <MainLayout {...props}>
      <AnimatedCard {...props}>{children}</AnimatedCard>
    </MainLayout>
  );
};

export const AnimatedCard: FC<Props> = ({ children, title, subTitle }) => (
  <motion.div
    variants={MAIN_VARIANTS}
    initial="hidden"
    animate="enter"
    exit="exit"
    transition={{ type: "spring" }}
    className="relative w-full mx-auto max-w-3xl"
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
);

export default MainLayout;

export const Header: FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="p-4 md:py-6 grid gap-4 bg-bluegray text-gray-300 w-full sticky top-0">
      <Clamp className="flex items-center justify-between">
        <Link href="/">
          <a>
            <Logo size="md" />
          </a>
        </Link>
        <div className="gap-2 grid-flow-col place-items-center md:grid hidden">
          {children}
        </div>
        <div className="grid gap-2 grid-flow-col place-items-end md:hidden w-full">
          <button
            className="outline-none focus:ring-2 ring-purple-500/60 bg-nearblack h-10 w-10 rounded-full p-2 text-pink-500"
            onClick={() => setOpen((x) => !x)}
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </Clamp>
      {isOpen && (
        <Clamp className="grid gap-2 place-items-end">{children}</Clamp>
      )}
    </header>
  );
};

export const Clamp = styled.div.tw`w-full max-w-3xl m-auto`;

export const Footer = () => (
  <footer className="flex items-center w-full h-24 bg-bluegray text-purple-200">
    <Clamp className="flex justify-center">
      <span className="font-display">
        &copy;{new Date().getFullYear()} / <Logo size="sm" />
      </span>
    </Clamp>
  </footer>
);
