import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { productList } from "./components/data";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const productHandle = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto md:container xl:container 2xl:container lg:px-10">
      <Button className="bg-indigo-500" width="w-full" onClick={openModal}>
        Add
      </Button>
      <div className="grid gap-4 lg:gap-6 xl:gap-8 2xl:gap10 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productHandle}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <div className="flex items-center gap-4">
          <Button className="bg-indigo-500" width="w-full">
            Submit
          </Button>
          <Button className="bg-red-500" width="w-full">
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
