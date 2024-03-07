interface IProps {
  msg: string;
}

const ErrorsMsg = ({ msg }: IProps) => {
  return (
    msg && (
      <span className="block text-red-700 font-semibold text-sm">{msg}</span>
    )
  );
};

export default ErrorsMsg;
