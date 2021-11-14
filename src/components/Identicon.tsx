import { FC, useEffect, useRef } from "react";
import jazzIcon from "@metamask/jazzicon";

const Identicon: FC<{ account: string }> = ({ account }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.innerHTML = "";
      targetRef.current.appendChild(
        jazzIcon(32, parseInt(account.slice(2, 10), 16))
      );
    }
  }, [account]);

  return (
    <div
      className="h-8 w-8 rounded-full bg-black ring ring-indigo-400 m-auto"
      ref={targetRef}
    />
  );
};

export default Identicon;
