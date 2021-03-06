import { FC } from "react";
import clsx from "clsx";
import { PulseLoader } from "react-spinners";

type Props = JSX.IntrinsicElements["button"] & {
  rounded?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
};

const Button: FC<Props> = ({
  size,
  variant,
  rounded,
  isLoading,
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500":
            variant === "primary",
          "text-purple-700 bg-purple-100 hover:bg-purple-200 focus:ring-purple-500":
            variant === "secondary",
          "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-purple-500":
            variant === "outline",
          "px-6 py-3.5 text-base": size === "xl",
          "px-5 py-2.5 text-base": size === "lg",
          "px-4 py-2.5 text-sm": size === "md",
          "px-3.5 py-2 text-sm": size === "sm",
          "px-3 py-1.5 text-xs": size === "xs",
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="absolute">
            <PulseLoader size={12} speedMultiplier={0.66} color="white" />
          </div>
          <div className="opacity-0">{children}</div>
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.defaultProps = {
  size: "md",
  variant: "primary",
};

export default Button;
