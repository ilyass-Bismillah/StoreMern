import { User, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navlink = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Product", href: "/product" },
  { label: "Store", href: "/store" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className="sticky top-0 bg-black text-white py-3 z-50 flex justify-between items-center font-sans max-w-7xl mx-auto">
      <div className="flex flex-col items-start leading-none">
        <div className="text-4xl font-extrabold tracking-tight">EX</div>
        <div className="text-xs uppercase tracking-widest mt-0.5">
          Evanox Store
        </div>
      </div>

      <div className="hidden md:flex space-x-8 uppercase text-base font-medium">
        {Navlink.map(({ label, href }) => {
          return (
            <Link
              to={href}
              key={label}
              className="hover:text-gray-400 transition-colors"
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center space-x-6">
        <User className="w-6 h-6 hover:text-gray-400 transition-colors cursor-pointer" />
        <ShoppingBag className="w-6 h-6 hover:text-gray-400 transition-colors cursor-pointer" />

        <button onClick={toggleMenu}>
          {isOpen ? (
            <X className="w-6 h-6 hover:text-gray-400 transition-colors md:hidden cursor-pointer" />
          ) : (
            <Menu className="w-6 h-6 hover:text-gray-400 transition-colors md:hidden cursor-pointer" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full w-full left-0 bg-black z-40 duration-300 ease-in-out transition-all shadow-lg">
          {Navlink.map(({ label, href }) => {
            return (
              <div className="flex flex-col space-y-4 py-4 px-6 uppercase text-base text-white font-medium">
              <Link
                to={href}
                key={label}
                className="hover:text-gray-400 transition-colors"
                onClick={toggleMenu}
              >
                {label}
              </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
