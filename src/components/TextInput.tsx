import { forwardRef } from "react";
import cn from "classnames";
import Label from "components/Label";

type Props = JSX.IntrinsicElements["input"] & {
  rounded?: boolean;
  variant?: "primary" | "secondary" | "outline";
  label?: string;
  errorMessage?: string;
};

const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    { variant, rounded, children, label, errorMessage, className, ...props },
    ref
  ) => {
    const field = (
      <input
        type={props.type}
        className={cn(
          "shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md",
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
            <Label
              htmlFor={props.name}
              className="block text-sm font-medium text-gray-700 text-left"
            >
              <span>{label}</span>
            </Label>
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

TextInput.displayName = "TextInput";

TextInput.defaultProps = {
  variant: "primary",
  type: "text",
};

export default TextInput;
