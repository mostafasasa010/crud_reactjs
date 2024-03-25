/* eslint-disable react-refresh/only-export-components */
import { InputHTMLAttributes, forwardRef, memo } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(
  ({ ...rest }: IProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <input
        className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-2 text-md"
        {...rest}
        ref={ref}
      />
    );
  }
);

export default memo(Input);
