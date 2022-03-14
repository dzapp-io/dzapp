import { useState } from "react";
import clsx from "clsx";
import Typewriter from "typewriter-effect";

import MainLayout from "layouts/MainLayout";

import LogoSvg from "assets/icons/dzapp.svg";

export default function Home() {
  return (
    <MainLayout title="">
      <Hero />
    </MainLayout>
  );
}

const HERO_STEPS = ["Get stuff done", "Build workflows", "Automate Web3 with"];

const LAST_STEP_INDEX = HERO_STEPS.length - 1;

function Hero() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="grid place-content-center gap-4 w-full flex-1 relative">
      <h1 className="text-3xl uppercase font-mono font-bold text-white block text-center">
        {introComplete ? (
          HERO_STEPS[LAST_STEP_INDEX]
        ) : (
          <Typewriter
            onInit={(typewriter) => {
              HERO_STEPS.forEach((step, i) => {
                typewriter.typeString(step);

                // if it isn't the last step,
                // pause for 1s, then delete
                if (i !== LAST_STEP_INDEX) {
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
      <LogoSvg
        className={clsx("transition-opacity duration-1000", {
          "opacity-0 hidden": !introComplete,
        })}
      />
    </div>
  );
}
