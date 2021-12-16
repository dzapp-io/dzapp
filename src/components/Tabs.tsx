import { FC } from "react";
import clsx from "clsx";

export type TabProps = { id: string; label: string; disabled?: boolean };

export type Props = {
  tabs: TabProps[];
  selectedTabIndex: number;
  onChange(tabIndex: number): void;
  tabMinWidth?: number | string;
};

const Tabs: FC<Props> = (props) => {
  return (
    <div>
      {props.tabs.map((tab, i) => {
        const isSelected = props.selectedTabIndex === i;
        return (
          <button
            key={`tab-${i}`}
            role="tab"
            className={clsx(
              "bg-dark p-2 md:px-8 px-4 h-[51px] relative overflow-hidden border border-white/10",
              {
                "bg-dimmed border-none": isSelected,
                "rounded-l-xl": i === 0,
                "rounded-r-xl": i === props.tabs.length - 1,
                "text-faded cursor-not-allowed": tab.disabled,
              }
            )}
            onClick={props.onChange.bind(null, i)}
            style={{ minWidth: props.tabMinWidth }}
          >
            {tab.label}
            {isSelected && (
              <div className="absolute bottom-0 right-0 left-0 h-1 bg-gradient-to-r from-brand to-assertive" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
