import Link from "next/link";
import React, { useRef, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import Sidebar from "./Sidebar";

function Navbar({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  key,
}) {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.add("translate-x-full");
      ref.current.classList.remove("translate-x-0");
    }
  };
  return (
    <header className="text-gray-600 body-font sticky top-0 shadow-xl z-10 bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Codeswear</span>
          </a>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center font-bold text-base justify-center">
          <Link href="/tshirts" className="mr-5 hover:text-gray-900">
            <a className="p-2">Tshirts</a>
          </Link>
          <Link href="/hoodies" className="mr-5 hover:text-gray-900">
            <a className="p-2">Hoodies</a>
          </Link>
          <Link href="/mugs" className="mr-5 hover:text-gray-900">
            <a className="p-2"> Mugs</a>
          </Link>
          <Link href="/stickers" className="mr-5 hover:text-gray-900">
            <a className="p-2">Stickers</a>
          </Link>
        </nav>

        <div className="mr-8 text-2xl">
          {dropdown && (
            <div className="absolute right-40 rounded-md  text-sm p-5 top-16 border-black bg-blue-900 text-white ">
              <ul>
                <Link href="/myaccount">
                  <a>
                    <li className="py-1  px-2 hover:bg-white hover:text-blue-900">
                      My Account
                    </li>
                  </a>
                </Link>
                <Link href="/orders">
                  <a>
                    <li className="py-1  px-2 hover:bg-white hover:text-blue-900">
                      Orders
                    </li>
                  </a>
                </Link>

                <a>
                  <li
                    className="py-1  px-2 hover:bg-white hover:text-blue-900"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </a>
              </ul>
            </div>
          )}
          {user.value !== null && <MdAccountCircle onClick={toggleDropdown} />}

          {!user.value && (
            <Link href="/login">
              <a>
                <button>Login</button>
              </a>
            </Link>
          )}
        </div>

        <button
          onClick={toggleCart}
          className="inline-flex items-center relative bg-gray-100 border-0 py-1 cursor-pointer px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          <FiShoppingCart className="text-3xl " />
          {Object.keys(cart).length > 0 && (
            <p className="bg-indigo-500 rounded-full px-2 absolute -right-2 -top-4 border-red-200">
              {Object.keys(cart).length}
            </p>
          )}
        </button>
        <div
          ref={ref}
          className="sidebar absolute top-0 right-2 z-10 transition-transform translate-x-full"
        >
          <Sidebar
            toggleCart={toggleCart}
            clearCart={clearCart}
            cart={cart}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
            subTotal={subTotal}
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
