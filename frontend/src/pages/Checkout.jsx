// FILE: frontend/src/pages/Checkout.jsx

import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import formatPrice from "../utils/formatPrice";
import { TrashIcon } from "lucide-react";

const Checkout = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const cartItems = cart?.items || [];

  // TOTAL ITEMS COUNT (quantity sum)
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // SUBTOTAL
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // SHIPPING LOGIC
  const SHIPPING_COST = subtotal >= 1000 ? 0 : 50;

  const TAX_RATE = 0;
  const taxAmount = subtotal * TAX_RATE;
  const grandTotal = subtotal + SHIPPING_COST + taxAmount;

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!address.trim()) {
      alert("Please enter shipping address");
      return;
    }

    try {
      setLoading(true);

      await api.post("/orders", {
        shippingAddress: address,
      });

      clearCart();
      alert("Order placed successfully ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT – CART ITEMS */}
        <div className="md:col-span-2 border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">
            Cart Items ({totalItems})
          </h2>

          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.product.price)}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                      className="px-2 border rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity + 1)
                      }
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-500 mt-14 md:mt-4"
                >
                  <TrashIcon size={18}  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="border rounded-lg p-4 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Items ({totalItems})</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span className={SHIPPING_COST === 0 ? "text-green-600" : ""}>
              {SHIPPING_COST === 0 ? "FREE" : formatPrice(SHIPPING_COST)}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Tax (0%)</span>
            <span>{formatPrice(taxAmount)}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>

          <textarea
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded disabled:opacity-60"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
