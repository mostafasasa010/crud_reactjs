import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import ProductCard from "./components/ProductCard";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorsMsg from "./components/ErrorsMsg";
import CircleColors from "./components/CircleColors";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { TProductName } from "./types";
import toast, { Toaster } from "react-hot-toast";

function App() {
  // CONSTANTS
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

  // STATES
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  const [tmpColors, setTmpColors] = useState<string[]>([]);

  const [products, setProducts] = useState<IProduct[]>(productList);

  const [editProduct, setEditProduct] = useState<IProduct>(defaultProductObj);

  const [indexEditProduct, setIndexEditProduct] = useState(0);

  const [product, setProduct] = useState<IProduct>(defaultProductObj);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [validateColors, setValidateColors] = useState("");

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  // HANDLERS
  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const closeEditModal = () => setIsOpenEdit(false);

  const openEditModal = useCallback(() => setIsOpenEdit(true), []);

  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  const openConfirmModal = useCallback(() => setIsOpenConfirmModal(true), []);

  const onChangeHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const onChangeEditHandle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setEditProduct((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleTmpColors = (color: string) =>
    setTmpColors((prev) => prev.filter((item) => item !== color));
  const handleCancel = (): void => {
    setProduct(defaultProductObj);
    closeModal();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const { title, description, imageURL, price } = product;
    event.preventDefault();
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (hasErrors || tmpColors.length === 0) {
      setErrors(errors);
      setValidateColors("Please select at least one color");
      return;
    }
    setProducts((prev) => [
      { ...product, id: uuid(), colors: tmpColors, category: selectedCategory },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTmpColors([]);
    closeModal();
    toast("Product has been Added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#222",
        color: "white",
      },
    });
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const { title, description, imageURL, price } = editProduct;
    event.preventDefault();
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (hasErrors || tmpColors.concat(editProduct.colors).length === 0) {
      setErrors(errors);
      setValidateColors("Please select at least one color");
      return;
    }
    if (hasErrors) {
      setErrors(errors);
      return;
    }
    const updatedProduct = [...products];
    updatedProduct[indexEditProduct] = {
      ...editProduct,
      colors: tmpColors.concat(editProduct.colors),
    };
    setProducts(updatedProduct);
    setEditProduct(defaultProductObj);
    setTmpColors([]);
    closeEditModal();
    toast("Product has been Updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#222",
        color: "white",
      },
    });
  };

  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== editProduct.id
    );
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#222",
        color: "white",
      },
    });
  };

  const handleClick = (color: string) => {
    if (tmpColors.includes(color)) {
      handleTmpColors(color);
      return;
    }
    if (editProduct.colors.includes(color)) {
      handleTmpColors(color);
      return;
    }
    setValidateColors("");
    setTmpColors((prev) => [...prev, color]);
  };

  // RENDERS
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
          onChange={onChangeHandle}
          value={product[input.name]}
          ref={inputRef}
        />
        <ErrorsMsg msg={errors[input.name]} />
      </div>
    );
  });

  const productRender = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      setEditProduct={setEditProduct}
      openEditModal={openEditModal}
      setIndexEditProduct={setIndexEditProduct}
      indexEditProduct={index}
      openConfirmModal={openConfirmModal}
    />
  ));

  const colorsRender = colors.map((color) => (
    <CircleColors
      color={color}
      title={color}
      key={color}
      onClick={() => handleClick(color)}
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

  const productEditWithErrorsRender = (
    id: string,
    label: string,
    name: TProductName
  ) => {
    return (
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
        <Input
          id={id}
          name={name}
          type={"text"}
          onChange={onChangeEditHandle}
          value={editProduct[name]}
        />
        <ErrorsMsg msg={errors[name]} />
      </div>
    );
  };

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
      {/* New Product */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <form className="space-y-3" onSubmit={handleSubmit}>
          {formRender}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center flex-wrap gap-1 mt-4">
            {colorsRender}
            {validateColors && <ErrorsMsg msg={validateColors} />}
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
      {/* Edit Product */}
      <Modal
        isOpen={isOpenEdit}
        closeModal={closeEditModal}
        title="Edit This Product"
      >
        <form className="space-y-3" onSubmit={handleEditSubmit}>
          {productEditWithErrorsRender("title", "Product Title", "title")}
          {productEditWithErrorsRender(
            "description",
            "Product Description",
            "description"
          )}
          {productEditWithErrorsRender(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {productEditWithErrorsRender("price", "Product Price", "price")}
          <Select
            selected={editProduct.category}
            setSelected={(value) =>
              setEditProduct({ ...editProduct, category: value })
            }
          />
          <div className="flex items-center flex-wrap gap-1 mt-4">
            {colorsRender}
            {validateColors && <ErrorsMsg msg={validateColors} />}
          </div>
          <div className="flex items-center flex-wrap gap-1 mt-4">
            {tmpColors.concat(editProduct.colors).map((color) => {
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
            })}
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
      {/* Delete Product */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
}

export default App;
