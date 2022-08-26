import {
  AiFillCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import React from "react";
import Link from "next/link";

function Sidebar({
  toggleCart,
  cart,
  clearCart,
  removeFromCart,
  addToCart,
  subTotal,
}) {
  return (
    <div className="height-[100vh] shadow-xl">
      <aside className="w-64" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <h2 className="font-bold text-center">Shopping Cart</h2>
          <span
            className="absolute right-4 top-4 cursor-pointer text-2xl"
            onClick={toggleCart}
          >
            <AiFillCloseCircle />
          </span>
          <ol className="space-y-2 px-4 mb-10">
            {Object.keys(cart).map((k, index) => {
              return (
                <li className="flex my-3" key={index}>
                  <span className="w-2/3 px-3">
                    {cart[k].name} {cart[k].size}
                    {" / "}
                    {cart[k].variant}
                  </span>
                  <span className="w-1/3 flex">
                    <AiOutlineMinusCircle
                      className="text-xl mr-2"
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                    />
                    {cart[k].qty}
                    <AiOutlinePlusCircle
                      className="text-xl ml-2"
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                    />
                  </span>
                </li>
              );
            })}
          </ol>
          {Object.keys(cart).length === 0 && (
            <div className="m-2">No items in your cart</div>
          )}
          <p className="total font-bold m-2">Subtotal : ₹ {subTotal} </p>
          <div className="flex">
            <Link href={"/checkout"}>
              <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
