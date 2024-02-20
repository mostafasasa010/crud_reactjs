interface IProps {
  imageSrc: string;
  imageAlt: string;
  className: string;
}

const Image = ({ imageSrc, imageAlt, className }: IProps) => {
  return <img src={imageSrc} alt={imageAlt} className={className} />;
};

export default Image;
