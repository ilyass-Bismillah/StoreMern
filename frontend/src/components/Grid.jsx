import ProductGrid from "./ProductGrid";
import { useState, useEffect } from "react";
import axios from 'axios'

const Grid = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-5 py-15">
      {products.map((product) => (
        <ProductGrid key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Grid;
