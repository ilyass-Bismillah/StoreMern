import Rating from "./Rating";
import { Link } from "react-router-dom";

const ProductGrid = (props) => {
  const { _id, name, price, rating, images, numReviews } = props.product;
  return (
    <Link
      to={`/product/${_id}`}
      className="hover:shadow-lg hover:scale-105 cursor-pointer shadow-white/10 rounded-2xl p-4 duration-300"
    >
      <div>{images && images.length > 0 && <img src={images[0]} alt="" />}</div>
      <div className="space-y-2">
        <h3 className="text-lg tracking-wider font-light line-clamp-2">
          {name}
        </h3>
        <div className="flex items-center gap-3">
          <Rating value={rating} text={numReviews} />
        </div>
        <h2 className="font-bold">{price} USD</h2>
      </div>
    </Link>
  );
};

export default ProductGrid;
