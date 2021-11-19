import { FC } from "react";
import classNames from "classnames";

type Props = JSX.IntrinsicElements["span"] & {
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

const Logo: FC<Props> = ({ size, className, ...props }) => {
  return (
    <span
      className={classNames(
        "font-semibold  text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-800 font-display tracking-tight",
        {
          "text-7xl": size === "xl",
          "text-5xl": size === "lg",
          "text-3xl": size === "md",
          "text-base": size === "sm",
          "text-sm": size === "xs",
        }
      )}
      {...props}
    >
      dZApp
    </span>
  );
};

export default Logo;
