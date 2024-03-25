/* eslint-disable react-refresh/only-export-components */
import { ButtonHTMLAttributes, ReactNode, memo } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      className={`${className} ${width} text-white p-2 font-semibold rounded-md hover:opacity-80 duration-300`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default memo(Button);
