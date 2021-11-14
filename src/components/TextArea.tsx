import { FC, forwardRef } from "react";
import cn from "classnames";

type Props = JSX.IntrinsicElements["textarea"] & {
  rounded?: boolean;
  variant?: "primary" | "secondary" | "outline";
  label?: string;
};

const TextArea: FC<Props> = forwardRef(
  ({ variant, rounded, children, label, className, ...props }, ref) => {
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
    return label ? (
      <div className="grid gap-2">
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700"
        >
          <span>{label}</span>
        </label>
        {field}
      </div>
    ) : (
      field
    );
  }
);

TextArea.displayName = "TextArea";

TextArea.defaultProps = {
  variant: "primary",
};

export default TextArea;
