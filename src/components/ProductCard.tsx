import Image from "./Image";
import { IProduct } from "../interfaces";
import Button from "./ui/Button";
import { txtSlicer } from "../utils/functions";
import CircleColors from "./CircleColors";

interface IProps {
  product: IProduct;
  setEditProduct: (product: IProduct) => void;
  openEditModal: () => void;
  indexEditProduct: number;
  setIndexEditProduct: (value: number) => void;
}

const ProductCard = ({
  product,
  setEditProduct,
  openEditModal,
  indexEditProduct,
  setIndexEditProduct,
}: IProps) => {
  const { title, description, imageURL, price, colors, category } = product;
  // Renders
  const colorsRender = colors.map((color) => (
    <CircleColors color={color} title={color} key={color} />
  ));
  // Handlers
  const onEdit = () => {
    setEditProduct(product);
    setIndexEditProduct(indexEditProduct);
    openEditModal();
  };
  return (
    <div className="flex flex-col p-4 rounded-md border-2 border-gray-200 justify-between lg:max-w-xs mx-auto">
      <Image
        imageSrc={imageURL}
        imageAlt={category.name}
        className="rounded-md"
      />
      <div className="mt-2">
        <h1 className="text-xl font-semibold mb-3">{title}</h1>
        <p className="text-sm text-gray-500">{txtSlicer(description)}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">{colorsRender}</div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-lg text-indigo-500 font-semibold ">${price}</span>
        <Image
          imageSrc={category.imageURL}
          imageAlt={category.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex gap-4 mt-4">
        <Button className="bg-indigo-500" onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-red-500">Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
