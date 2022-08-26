import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Head from "next/head";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import Script from "next/script";

function Checkout({ cart, addToCart, removeFromCart, subTotal }) {
  const phoneRegExp = /^[6-9]\d{9}$/;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      pincode: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("email is required"),
      pincode: Yup.string()
        .min(6, "minimum 6 characters required")
        .required("email is required"),

      address: Yup.string()
        .min(10, "minimum 10 characters required")
        .required("email is required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("phone number is required"),
      name: Yup.string()
        .min(10, "min 10 characters are required")
        .required("name is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      initiatePayment(
        formik.values.email,
        formik.values.name,
        formik.values.pincode,
        formik.values.address,
        formik.values.phone
      );
      formik.resetForm();
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const initiatePayment = async (email, name, pincode, address, phone) => {
    let oid = Math.floor(Math.random() * Date.now());
    console.log(
      "data is",
      cart,
      subTotal,
      oid,
      email,
      name,
      pincode,
      address,
      phone
    );
    const data = { cart, subTotal, oid, email, name, pincode, address, phone };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    let txnToken = txnRes.txnToken;
    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <div className="container m-auto">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
      />
      <h1 className="text-3xl text-center font-bold m-4">Checkout</h1>
      <h2 className="font-bold text-xl">1. Delivery details</h2>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div className="mx-auto flex">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...formik.getFieldProps("name")}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {formik.errors.name ? (
                <p className="error">{formik.errors.name}</p>
              ) : null}
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {formik.errors.email ? (
                <p className="error">{formik.errors.email}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>
            <textarea
              id="address"
              {...formik.getFieldProps("address")}
              rows="2"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {formik.errors.address ? (
              <p className="error">{formik.errors.address}</p>
            ) : null}
          </div>
        </div>
        <div className="mx-auto flex">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                phone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                {...formik.getFieldProps("phone")}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {formik.errors.phone ? (
                <p className="error">{formik.errors.phone}</p>
              ) : null}
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="pincode"
                className="leading-7 text-sm text-gray-600"
              >
                pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                {...formik.getFieldProps("pincode")}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {formik.errors.pincode ? (
                <p className="error">{formik.errors.pincode}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mx-auto flex mb-10">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value="enter "
                readOnly={true}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="state"
                className="leading-7 text-sm text-gray-600"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value="enter "
                readOnly={true}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <h2 className="font-bold text-xl">2. Review cart items and Pay</h2>
        <div className=" py-4 px-3 dark:bg-gray-800 max-w-sm mx-auto">
          <ol className="space-y-2 px-4 mb-10">
            {Object.keys(cart).map((k, index) => {
              return (
                <li className="flex my-3" key={index}>
                  <span className="w-2/3 px-3">
                    {cart[k].name} ({cart[k].variant}
                    {"/"}
                    {cart[k].size})
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

          {subTotal > 0 && (
            <>
              <span className="total font-bold">Subtotal : ₹ {subTotal} </span>
              {/* <Link href="/order"> */}
              <button
                type="submit"
                className="disabled:bg-indigo-200 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Pay ₹ {subTotal}
              </button>
              {/* </Link> */}
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Checkout;
