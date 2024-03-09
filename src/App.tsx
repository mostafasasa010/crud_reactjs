import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorsMsg from "./components/ErrorsMsg";
import CircleColors from "./components/CircleColors";
import { v4 as uuid } from "uuid";

function App() {
  // Constants
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tmpColors, setTmpColors] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  // Handlers
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleTmpColors = (color: string) =>
    setTmpColors((prev) => prev.filter((item) => item !== color));
  const handleCancel = (): void => {
    setProduct(defaultProductObj);
    closeModal();
    console.log(product);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const { title, description, imageURL, price } = product;
    event.preventDefault();
    const errors = productValidation({ title, description, imageURL, price });
    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (hasErrors) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      { ...product, id: uuid(), colors: tmpColors },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTmpColors([]);
    closeModal();
  };
  // Renders
  const formRender = formInputsList.map((input) => {
    return (
      <div className="flex flex-col" key={input.id}>
        <label
          className="mb-1 text-sm font-medium text-gray-700"
          htmlFor={input.id}
        >
          {input.label}
        </label>
        <Input
          id={input.id}
          name={input.name}
          type={input.type}
          onChange={(e) => onChangeHandle(e)}
          value={product[input.name]}
        />
        <ErrorsMsg msg={errors[input.name]} />
      </div>
    );
  });
  const productRender = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const colorsRender = colors.map((color) => (
    <CircleColors
      color={color}
      title={color}
      key={color}
      onClick={() => {
        if (tmpColors.includes(color)) {
          handleTmpColors(color);
          return;
        }
        setTmpColors((prev) => [...prev, color]);
      }}
    />
  ));
  const tmpColorsRender = tmpColors.map((color) => {
    return (
      <span
        className="py-[2px] px-[6px] rounded-md text-white cursor-pointer text-sm font-semibold"
        style={{ backgroundColor: color }}
        title={color}
        key={color}
        onClick={() => handleTmpColors(color)}
      >
        {color}
      </span>
    );
  });

  return (
    <main className="container mx-auto md:container xl:container 2xl:container lg:px-10">
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 font-medium rounded-lg text-white px-3 py-3 duration-200"
        width="w-fit"
        onClick={openModal}
      >
        Build a product
      </Button>
      <div className="grid gap-4 lg:gap-6 xl:gap-8 2xl:gap10 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productRender}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <form className="space-y-3" onSubmit={handleSubmit}>
          {formRender}
          <div className="flex items-center flex-wrap gap-1 mt-4">
            {colorsRender}
          </div>
          <div className="flex items-center flex-wrap gap-1 mt-4">
            {tmpColorsRender}
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-indigo-500" width="w-full">
              Submit
            </Button>
            <Button
              className="bg-gray-500"
              width="w-full"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
