import { FC, useEffect, useRef } from "react";
import jazzIcon from "@metamask/jazzicon";
import clsx from "clsx";

const Identicon: FC<{ account: string; size?: number; className?: string }> = ({
  account,
  className,
  size = 32,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.innerHTML = "";
      targetRef.current.appendChild(
        jazzIcon(size, parseInt(account.slice(2, 10), 16))
      );
    }
  }, [account, size]);

  return (
    <div
      className={clsx("rounded-full m-auto grid place-items-center", className)}
      style={{ width: size * 1.125, height: size * 1.125 }}
      ref={targetRef}
    />
  );
};

export default Identicon;
