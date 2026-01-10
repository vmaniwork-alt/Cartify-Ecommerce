// FILE: frontend/src/pages/ProductDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import formatPrice from "../utils/formatPrice";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    addToCart(product._id, quantity);
    alert("Item added to cart ✅");
  };

  if (loading) return <Loader />;
  if (!product)
    return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start ">
        
        {/* IMAGE SECTION */}
        <div className="flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-md h-[420px] object-contain rounded-lg"
          />
        </div>

        {/* DETAILS SECTION */}
        <div>
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-2">
            {product.name}
          </h1>

          {/* Rating & Delivery */}
          <div className="flex items-center gap-3 text-sm text-gray-700 mb-3">
            <span>⭐ 4.3</span>
            <span>🚚 Free Delivery</span>
            <span>🔁 7 Days Replacement</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-green-600 mb-4">
            {formatPrice(product.price)}
          </p>

          {/* Description */}
          {product.description && (
            <ul className="text-gray-600 mb-6 list-disc pl-5 space-y-1">
              {product.description.split(".").map(
                (line, index) =>
                  line.trim() && <li key={index}>{line}</li>
              )}
            </ul>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity:</span>

            <div className="flex items-center border rounded">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                −
              </button>

              <span className="px-4 py-1">{quantity}</span>

              <button
                onClick={increaseQty}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* MOBILE STICKY ADD TO CART */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow md:hidden">
        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;