// FILE: frontend/src/components/Footer.jsx

import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-16">
      
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            <span className="bg-green-600 text-white rounded-full px-2">C</span> Cartify
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Shop smart. Live better.  
            Quality products at affordable prices.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Cart", path: "/cart" },
              { name: "Login", path: "/login" },
            ].map((link) => (
              <li key={link.name} className="py-1">
                <Link
                  to={link.path}
                  className="hover:text-white transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="py-1 hover:text-white transition cursor-pointer">Clothing</li>
            <li className="py-1 hover:text-white transition cursor-pointer">Electronics</li>
            <li className="py-1 hover:text-white transition cursor-pointer">Accessories</li>
            <li className="py-1 hover:text-white transition cursor-pointer">Home & Living</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="py-1">📧 support@cartify.com</li>
            <li className="py-1">📞 +91 98765 43210</li>
            <li className="py-1">📍 India</li>
          </ul>
        </div>

      </div>

      {/* SOCIAL + COPYRIGHT */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
        
        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-5 mb-3 text-lg">
          <FaGithub className="hover:text-white transition cursor-pointer" />
          <FaLinkedin className="hover:text-white transition cursor-pointer" />
          <FaInstagram className="hover:text-white transition cursor-pointer" />
        </div>

        © {new Date().getFullYear()} Cartify. All rights reserved.  
        <span className="block mt-1">
          Built by <span className="text-white font-medium">Mani V</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
