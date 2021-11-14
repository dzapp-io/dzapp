import React, { FC } from "react";

export const tw = (input: TemplateStringsArray) => String(input);

export function styled<K extends keyof JSX.IntrinsicElements>(
  element: K,
  className: string
) {
  const InnerComponent: FC<JSX.IntrinsicElements[K]> = (props) =>
    React.createElement(element, { ...props, className }, props.children);

  InnerComponent.displayName = element;

  return InnerComponent;
}
