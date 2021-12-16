import { FC } from "react";
import clsx from "clsx";

type Props = JSX.IntrinsicElements["span"] & {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
};

const Logo: FC<Props> = ({ size, className, ...props }) => {
  return (
    <span
      className={clsx(
        "font-semibold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-800 font-display tracking-tight",
        {
          "text-8xl": size === "3xl",
          "text-7xl": size === "2xl",
          "text-6xl": size === "xl",
          "text-5xl": size === "lg",
          "text-3xl": size === "md",
          "text-base": size === "sm",
          "text-sm": size === "xs",
        },
        className
      )}
      {...props}
    >
      dZApp
    </span>
  );
};

export default Logo;
