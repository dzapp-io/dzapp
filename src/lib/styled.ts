/* eslint-disable react/display-name */
import { createElement, forwardRef } from "react";
import clsx, { ClassValue } from "clsx";

import ReactDOMFactories from "react-dom-factories";

type Elements = JSX.IntrinsicElements;

/**
 * This helper has the sole purpose of add tailwindcss intellisense
 * @example
 * ```
 * import styled, { tw } from "styled-tailwind";
 *
 * const Link = styled.a(tw`font-indigo-500 underline`);
 * // ...
 * ```
 */
export const tw = (...args: TemplateStringsArray[]): string => {
  return String(args);
};

function styled<T extends keyof Elements>(
  type: T,
  ...classNames: ClassValue[]
) {
  return forwardRef<T, Elements[T]>(({ className, ...props }, ref) =>
    createElement(type, {
      ...props,
      className: clsx([className, ...classNames]),
      ref,
    })
  );
}

function styledWithProps<T extends keyof Elements>(
  type: T,
  defaultProps: Elements[T],
  ...classNames: ClassValue[]
) {
  return forwardRef<T, Elements[T]>(({ className, ...props }, ref) =>
    createElement(type, {
      ...props,
      ...defaultProps,
      className: clsx([className, defaultProps?.className, ...classNames]),
      ref,
    })
  );
}

export type FactoryFn<T extends keyof Elements> = (
  ...className: ClassValue[]
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<JSX.IntrinsicElements[T]> & React.RefAttributes<T>
>;

export interface StyledApiFn<T extends keyof Elements> {
  (...className: ClassValue[]): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<JSX.IntrinsicElements[T]> & React.RefAttributes<T>
  >;
  props(props: JSX.IntrinsicElements[T]): FactoryFn<T>;
  tw(
    ...args: TemplateStringsArray[]
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<JSX.IntrinsicElements[T]> & React.RefAttributes<T>
  >;
}

export type StyledFactories = {
  [T in keyof Elements]: StyledApiFn<T>;
};

export const styledObj = Object.keys(ReactDOMFactories).reduce(
  (factories, type) => {
    const factory = (...classNames: ClassValue[]) =>
      styled(type as keyof Elements, ...classNames);

    factory.props =
      <T extends keyof Elements>(props: Elements[T]) =>
      (...classNames: ClassValue[]) =>
        styledWithProps(type as keyof Elements, props, ...classNames);

    factory.tw = (...args: TemplateStringsArray[]) =>
      styled(type as keyof Elements, String(args));

    return {
      ...factories,
      [type]: factory,
    };
  },
  {} as StyledFactories
);

const api = {
  ...styled,
  ...styledObj,
};

export default api;
