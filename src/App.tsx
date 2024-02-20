import ProductCard from "./components/ProductCard";
import { productList } from "./components/data";

function App() {
  const productHandle = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto md:container xl:container 2xl:container lg:px-10">
      <div className="grid gap-4 lg:gap-6 xl:gap-8 2xl:gap10 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productHandle}
      </div>
    </main>
  );
}

export default App;
