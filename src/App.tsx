import { ChangeEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import { formInputsList, productList } from "./components/data";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import { IProduct } from "./components/interfaces";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const formHandle = formInputsList.map((input, index) => {
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
      </div>
    );
  });
  const productHandle = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  return (
    <main className="container mx-auto md:container xl:container 2xl:container lg:px-10">
      <Button className="bg-indigo-500" width="w-full" onClick={openModal}>
        Add
      </Button>
      <div className="grid gap-4 lg:gap-6 xl:gap-8 2xl:gap10 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productHandle}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <div className="space-y-3">
          {formHandle}
          <div className="flex items-center gap-3">
            <Button className="bg-indigo-500" width="w-full">
              Submit
            </Button>
            <Button className="bg-gray-500" width="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default App;
