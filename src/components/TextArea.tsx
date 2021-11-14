import { FC, forwardRef } from "react";
import cn from "classnames";

type Props = JSX.IntrinsicElements["textarea"] & {
  rounded?: boolean;
  variant?: "primary" | "secondary" | "outline";
  label?: string;
  errorMessage?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    { variant, rounded, children, label, errorMessage, className, ...props },
    ref
  ) => {
    const field = (
      <textarea
        className={cn(
          "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
          className
        )}
        {...props}
        ref={ref}
      />
    );
    return (
      <>
        {label ? (
          <div className="grid gap-2">
            <label
              htmlFor={props.name}
              className="block text-sm font-medium text-gray-700 text-left"
            >
              <span>{label}</span>
            </label>
            {field}
          </div>
        ) : (
          field
        )}
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </>
    );
  }
);

TextArea.displayName = "TextArea";

TextArea.defaultProps = {
  variant: "primary",
};

export default TextArea;
