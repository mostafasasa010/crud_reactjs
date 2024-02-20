import Image from "./Image";
import { IProduct } from "./interfaces";
import Button from "./ui/Button";
import { txtSlicer } from "./utils/functions";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL } = product;
  return (
    <div className="flex flex-col p-4 rounded-md border-2 border-gray-200">
      <Image
        imageSrc={imageURL}
        imageAlt="Product Name"
        className="rounded-md"
      />

      <div className="mt-2">
        <h1 className="text-xl font-semibold mb-3">{title}</h1>
        <p className="text-sm text-gray-500">{txtSlicer(description)}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className="w-5 h-5 rounded-full bg-red-500 cursor-pointer" />
        <span className="w-5 h-5 rounded-full bg-blue-500 cursor-pointer" />
        <span className="w-5 h-5 rounded-full bg-yellow-500 cursor-pointer" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-lg text-indigo-500 font-semibold ">$350</span>
        <Image
          imageSrc="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          imageAlt="Product Name"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <Button className="bg-indigo-500">Edit</Button>
        <Button className="bg-red-500">Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
