import ProductGrid from "./ProductGrid";
import { useGetProductsQuery } from "../slices/productSlice";

const Grid = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()

  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error: {error.message}</div>
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-5 py-15">
      {products.map((product) => (
        <ProductGrid key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Grid;
