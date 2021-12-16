import { FC } from "react";
import clsx from "clsx";

import styles from "./Box.module.css";

type Props = JSX.IntrinsicElements["div"] & {
  rgb?: boolean;
  animated?: boolean;
};

const Box: FC<Props> = ({ className, animated, rgb, ...props }) => {
  if (rgb) {
    return (
      <div className="relative rounded-3xl overflow-hidden p-3">
        <div className={clsx("relative z-10 border-0", className)}>
          {props.children}
        </div>
        <div
          className={clsx(styles.rgb, "absolute inset-0 -m-4 filter blur-md")}
        ></div>
      </div>
    );
  }

  return (
    <div className={clsx("", className)} {...props}>
      {props.children}
    </div>
  );
};

export default Box;
