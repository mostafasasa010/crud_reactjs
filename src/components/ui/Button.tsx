import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: IProps) => {
  return (
    <button
      className={`${className} text-white p-2 font-semibold rounded-md flex-1`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
