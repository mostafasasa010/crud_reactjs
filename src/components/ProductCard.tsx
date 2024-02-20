interface IProps {}

const ProductCard = ({}: IProps) => {
  return (
    <div className="flex flex-col p-4 rounded-md border-2 border-gray-200">
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="Product Name"
        className="rounded-md"
      />

      <div className="mt-2">
        <h1 className="text-xl font-semibold mb-3">Nike Shoes</h1>
        <p className="text-sm text-gray-500">
          As luxury T-Shirt is just as distinctive and can be trimmed with
          premium materia
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className="w-5 h-5 rounded-full bg-red-500 cursor-pointer" />
        <span className="w-5 h-5 rounded-full bg-blue-500 cursor-pointer" />
        <span className="w-5 h-5 rounded-full bg-yellow-500 cursor-pointer" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-lg text-indigo-500 font-semibold ">$350</span>
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Product Name"
          className="w-10 h-10 rounded-full"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button className="flex-1 bg-indigo-500 text-white p-2 font-semibold rounded-md">
          Edit
        </button>
        <button className="flex-1 bg-red-500 text-white p-2 font-semibold rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
