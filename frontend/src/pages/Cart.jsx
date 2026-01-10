import { useCart } from "../context/CartContext";
import formatPrice from "../utils/formatPrice";
import { Link } from "react-router-dom";
import {TrashIcon} from "lucide-react";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const cartItems = cart?.items || [];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link to="/products" className="text-blue-600 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto  md:px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.product._id}
          className="flex items-center gap-4 border-b py-4"
        >
          <img
            src={item.product.imageUrl}
            className="w-20 h-20 object-cover rounded"
          />

          <div className="flex-1">
            <h2 className="font-semibold">{item.product.name}</h2>
            <p className="text-gray-600">
              {formatPrice(item.product.price)}
            </p>
          </div>

          <div className="items-center">
            <div className="flex md:block border rounded">
               <button
              onClick={() =>
                updateQuantity(item.product._id, item.quantity - 1)
              }
              className="px-3"
            >
              −
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item.product._id, item.quantity + 1)
              }
              className="px-3"
            >
              +
            </button>

            </div>
             <button
            onClick={() => removeFromCart(item.product._id)}
            className=" md:hidden text-red-500 text-sm ml-12 md:ml-0 mt-4 md:mt-0"
          >
          <TrashIcon size={20}/>
          </button>
           
          </div>
          <button
            onClick={() => removeFromCart(item.product._id)}
            className="text-red-500 text-sm md:flex hidden"
          >
          <TrashIcon size={20}/>
          </button>

         
        </div>
      ))}

      <div className="flex justify-between p-2 md:p-0 mt-6">
        <h2 className="text-xl font-semibold">
          Total: {formatPrice(totalPrice)}
        </h2>

        <Link
          to="/checkout"
          className="bg-green-600 text-white  px-6 py-2 rounded"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
