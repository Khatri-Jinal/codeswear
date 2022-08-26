import Link from "next/link";
import React, { useState } from "react";
import Product from "../models/Product";
import connectDb from "../middleware/mongoose";
import mongoose from "mongoose";

function tshirts({ products }) {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).map((item) => {
              return (
                <Link
                  href={`product/${products[item].slug}`}
                  key={products[item]._id}
                >
                  <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg">
                    <a className="block relative h-80 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-top w-full h-full block"
                        src={products[item].img}
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[item].category}
                      </h3>
                      <div>
                        {products[item].size.includes("S") && (
                          <span className="mr-4">S</span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="mr-4">M</span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="mr-4">L</span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="mr-4">XL</span>
                        )}
                        {products[item].size.includes("XXL") && (
                          <span>XXL</span>
                        )}
                      </div>
                      <div>
                        {products[item].color.includes("Black") && (
                          <button className="mr-1 border-2 border-black w-5 h-5 rounded-full bg-black"></button>
                        )}
                        {products[item].color.includes("Blue") && (
                          <button className="mr-1 border-2 border-black w-5 h-5  rounded-full bg-blue-800"></button>
                        )}
                        {products[item].color.includes("White") && (
                          <button className="mr-1 border-2 border-black w-5 h-5 rounded-full bg-white"></button>
                        )}
                        {products[item].color.includes("Red") && (
                          <button className="mr-1 border-2 border-black w-5 h-5 rounded-full bg-red-800"></button>
                        )}
                        {products[item].color.includes("Purple") && (
                          <button className="mr-1 border-2 border-black w-5 h-5 rounded-full bg-purple-800"></button>
                        )}
                      </div>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>

                      <p className="mt-1">₹ {products[item].price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "Tshirt" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  };
}

export default tshirts;
