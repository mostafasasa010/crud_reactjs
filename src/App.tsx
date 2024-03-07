import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorsMsg from "./components/ErrorsMsg";

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
  };
  // Renders
  const formRender = formInputsList.map((input, index) => {
    return (
      <div className="flex flex-col" key={index}>
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
  const productRender = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto md:container xl:container 2xl:container lg:px-10">
      <Button className="bg-indigo-500" width="w-full" onClick={openModal}>
        Add
      </Button>
      <div className="grid gap-4 lg:gap-6 xl:gap-8 2xl:gap10 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productRender}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <form className="space-y-3" onSubmit={handleSubmit}>
          {formRender}
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
