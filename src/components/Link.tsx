import { FC } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import clsx from "clsx";

type Props = JSX.IntrinsicElements["a"] & {
  withIcon?: boolean;
};

const Link: FC<Props> = ({ withIcon, children, ...props }) => (
  <a
    className={clsx("flex items-center underline", props.className)}
    {...props}
  >
    {children} {withIcon && <ExternalLinkIcon className="h-4" />}
  </a>
);

export default Link;
