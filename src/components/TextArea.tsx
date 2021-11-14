import { forwardRef } from "react";
import cn from "classnames";

import Label from "components/Label";

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
            <Label htmlFor={props.name}>{label}</Label>
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
