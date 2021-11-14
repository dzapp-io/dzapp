import { FC, useEffect, useRef } from "react";
import jazzIcon from "@metamask/jazzicon";

const Identicon: FC<{ account: string; size?: number }> = ({
  account,
  size,
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
      className="rounded-full bg-black m-auto grid place-items-center"
      style={{ width: size * 1.125, height: size * 1.125 }}
      ref={targetRef}
    />
  );
};

Identicon.defaultProps = { size: 32 };

export default Identicon;
