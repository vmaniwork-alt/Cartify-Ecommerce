// FILE: frontend/src/context/CartContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cart");
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post("/cart", { productId, quantity });
      fetchCart();
    } catch (error) {
      console.error("Add to cart failed");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.put("/cart", { productId, quantity });
      fetchCart();
    } catch (error) {
      console.error("Update cart failed");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      fetchCart();
    } catch (error) {
      console.error("Remove item failed");
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCart(null);
    } catch (error) {
      console.error("Clear cart failed");
    }
  };

  // Cart item count for Navbar
  const cartItemsCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        cartItemsCount,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
