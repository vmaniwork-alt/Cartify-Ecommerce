// FILE: frontend/src/components/ProductCard.jsx

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import formatPrice from "../utils/formatPrice";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    addToCart(product._id, 1);
  };

  return (
    <div className="border  shadow group bg-white rounded-2xl overflow-hidden  hover:shadow-xl transition-all   ">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-52 w-full mx-auto object-contain rounded-t-lg hover:scale-105 transition"
        />
      </Link>

      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
        </Link>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-blue-600">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
