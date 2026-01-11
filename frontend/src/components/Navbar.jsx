import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import {
  Menu,
  X,
  LogOut,
  ShoppingCart,
  User,
  Boxes,
  UserPlus,
  LogIn,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-1 text-blue-300 font-semibold underline underline-offset-8 decoration-2 decoration-blue-400"
      : "flex items-center gap-1 text-gray-200 hover:text-blue-300 hover:underline underline-offset-8 decoration-2 decoration-blue-400 transition";

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 shadow-lg px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-white">
          <span className="bg-green-600 text-white rounded-full px-2">C</span>{" "}
          Cartify
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/products" className={linkClass}>
            <Boxes size={20} /> Products
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/cart"
                className="relative flex items-center gap-1 text-gray-200 hover:text-blue-300 transition"
              >
                <ShoppingCart size={20} /> Cart
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </NavLink>

              <NavLink to="/account" className={linkClass}>
                <User size={20} /> Account
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-rose-600 text-white px-4 py-1.5 rounded-md hover:bg-rose-700 flex items-center gap-1 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                <LogIn size={20} /> Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 flex items-center gap-1 transition"
              >
                <UserPlus size={20} /> Register
              </NavLink>
            </>
          )}
        </div>

        {/* MOBILE ACTIONS */}
        <div className="md:hidden flex items-center gap-4">
          {/* MOBILE CART ICON */}
          {user && (
            <NavLink
              to="/cart"
              onClick={() => setOpen(false)}
              className="relative text-white"
            >
              <ShoppingCart size={26} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </NavLink>
          )}

          {/* MENU TOGGLE */}
          <button
            className="text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-5 bg-slate-900 rounded-lg p-4">
          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            <Boxes /> Products
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/cart"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                <ShoppingCart /> Cart ({cartItemsCount})
              </NavLink>

              <NavLink
                to="/account"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                <User /> Account
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 flex items-center justify-center gap-1 transition"
              >
                <LogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                <LogIn /> Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-1 transition"
              >
                <UserPlus /> Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
