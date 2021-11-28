import { FC } from "react";

type TabsProps = {};

export const Tab: FC = (props) => <div className="">{props.children}</div>;

const Tabs: FC<TabsProps> = () => {
  return <div className="flex gap-2"></div>;
};

export default Tabs;
