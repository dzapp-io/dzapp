import { useState } from "react";
import clsx from "clsx";
import Typewriter from "typewriter-effect";

import MainLayout from "layouts/MainLayout";

import Logo from "components/Logo";

export default function Home() {
  return (
    <MainLayout title="">
      <Hero />
    </MainLayout>
  );
}

function Hero() {
  const [introComplete, setIntroComplete] = useState(false);

  const steps = [
    "Get stuff done...",
    "Build workflows...",
    "Automate Web3 with",
  ];

  return (
    <div className="grid place-content-center gap-4">
      <h1 className="text-3xl uppercase font-mono font-bold text-white flex text-center">
        {introComplete ? (
          steps[steps.length - 1]
        ) : (
          <Typewriter
            onInit={(typewriter) => {
              steps.forEach((step, i) => {
                typewriter.typeString(step);
                if (i !== steps.length - 1) {
                  typewriter.pauseFor(1000).deleteAll();
                }
              }, typewriter);

              typewriter
                .pauseFor(300)
                .callFunction(setIntroComplete.bind({}, true))
                .start();
            }}
          />
        )}
      </h1>
      <Logo
        size="3xl"
        className={clsx("transition-opacity duration-1000", {
          "opacity-0": !introComplete,
        })}
      />
    </div>
  );
}
