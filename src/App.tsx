import ProductCard from "./components/ProductCard";
import { productList } from "./components/data";

function App() {
  const productHandle = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <div className="grid gap-4 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productHandle}
    </div>
  );
}

export default App;
