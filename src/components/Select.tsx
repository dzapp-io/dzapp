import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment, PropsWithChildren, ReactNode } from "react";

type Props<T = any> = {
  value?: T | null;
  label: string;
  items: { label: ReactNode; value: T }[];
  onChange: (value: T) => void;
  labelExtractor: (obj: T) => ReactNode;
};

function Select<T = string>(props: PropsWithChildren<Props<T>>) {
  return (
    <Listbox value={props.value} onChange={props.onChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white text-purple-800 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate text-lg">
            {props.value ? props.labelExtractor(props.value) : props.label}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {props.items.map((item, itemIdx) => (
              <Listbox.Option
                key={itemIdx}
                className={({ active }) =>
                  `${
                    active ? "text-purple-800 bg-purple-100" : "text-gray-900"
                  } cursor-default select-none relative py-2 pl-10 pr-4 text-lg`
                }
                value={item.value}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {item.label}
                    </span>
                    {selected ? (
                      <span className="text-purple-600 absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default Select;
