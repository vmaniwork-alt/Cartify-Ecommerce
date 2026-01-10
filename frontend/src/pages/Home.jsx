// FILE: frontend/src/pages/Home.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getAllProducts } from "../services/productService";
import formatPrice from "../utils/formatPrice";
import Loader from "../components/Loader";
import { FaCartShopping } from "react-icons/fa6";


const Home = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data.slice(0, 4));
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId) => {
    if (!user) {
      setMessage("Please login to add items to cart");
      return;
    }
    addToCart(productId, 1);
    setMessage("Added to cart successfully ");

    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-50">

      {/* OFFER BANNER */}
      <div className="bg-blue-950 text-white text-center py-3 px-4 text-sm md:text-base font-medium">
        🎉 Flat <span className="font-bold">30% OFF</span> on your first order!
        <Link to="/products" className="underline ml-2 font-semibold">
          Shop Now
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Shop Smart with <span className="text-green-400"> Cartify</span>
          </h1>

          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Quality products, unbeatable prices, and fast delivery at your doorstep.
          </p>

          <Link
            to="/products"
            className="inline-block  bg-green-400 hover:bg-green-500 text-black px-10 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <span className="flex items-center gap-1">Shop Now <FaCartShopping /></span>
          </Link>
        </div>
      </section>

      {/* MESSAGE */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-lg text-center">
            {message}
          </div>
        </div>
      )}

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Shop in Cartify
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Clothing", icon: "👕" },
            { name: "Electronics", icon: "📱" },
            { name: "Home", icon: "🏠" },
            { name: "Accessories", icon: "🎒" },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all"
            >
              <span className="text-5xl mb-3">{cat.icon}</span>
              <p className="font-semibold text-lg">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          BestSeller Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-56 w-full object-contain p-4 hover:scale-105 transition"
                />
              </Link>

              <div className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-green-500 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-400 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
      {/* WHY CHOOSE US */} <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center"> Why Choose Cartify? </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

            {[{ icon: "🚚", title: "Fast Delivery", desc: "On all orders above ₹199" },
            { icon: "🔒", title: "Secure Payments", desc: "100% safe & trusted" },
            { icon: "🔁", title: "Easy Returns", desc: "7-day replacement" },].map((item) =>
            (<div key={item.title}
              
              className="bg-gray-50 rounded-2xl text-xl font-semibold p-8 hover:shadow-lg transition" >
              <span className="text-5xl">{item.icon}</span>
              <h3 className="font-semibold mt-4 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p> </div>))}

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
