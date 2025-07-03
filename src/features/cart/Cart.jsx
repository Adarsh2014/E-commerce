"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { deleteCartAync, selectCartItems, updateCartAsync } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  console.log(open);
  const item = useSelector(selectCartItems);
  const sum = item.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);
  const totalItems = item.reduce((total, items) => {
    return items.quantity + total;
  }, 0);
  console.log(sum);
  console.log(item);

  const handleQuantity = (e, product) => {
    dispatch(
      updateCartAsync({ ...product, quantity: parseInt(e.target.value) })
    );
  };
  const handleRemove = (e, id) => {
    dispatch(deleteCartAync(id));
  };
  return (
    <div>
      <div className="mx-auto mt-12  bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        {item.length === 0 ? (
          <div className="text-center py-24">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329450.png"
              alt="Empty Cart"
              className="mx-auto mb-6 w-24 h-24 opacity-70"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              Your cart is currently empty
            </h2>
            <p className="mt-2 text-gray-500">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <div className="mt-6">
              <Link to="/">
                <button className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700">
                  Start Shopping
                  <span className="ml-2" aria-hidden="true">
                    &rarr;
                  </span>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {item.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt={product.title}
                          src={product.thumbnail}
                          className="size-full object-cover"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.title}</a>
                            </h3>
                            <p className="ml-4">$ {product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-4 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select
                              onChange={(e) => handleQuantity(e, product)}
                              value={product.quantity}
                              className="inline-flex items-center justify-center w-11 h-8 border border-gray-500 rounded-md bg-white text-gray-900 font-semibold text-base mr-2 pr-2 pl-2"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={(e) => handleRemove(e, product.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {sum}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Item in cart</p>
                <p>{totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link to="/">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
