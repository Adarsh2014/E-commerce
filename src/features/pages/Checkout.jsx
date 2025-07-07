import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

("use client");

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  deleteCartAync,
  selectCartItems,
  updateCartAsync,
} from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../user/userSlice";
import { createOrderAsync, selectCurrentOrder } from "../order/orderSlice";
import { selectUserInfo } from "../user/userSlice";

function Checkout() {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log(errors);
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

  const handleAddress = (e) => {
    console.log("Selected address:", e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log("Selected address:", e.target.value);
    setPaymentMethod(e.target.value);
    console.log(selectedAddress);
  };

  const handleOrder = () => {
    if (selectedAddress && paymentMethod) {
      const order = {
        item,
        sum,
        totalItems,
        user,
        paymentMethod,
        selectedAddress,
        status: "Pending",
      };
      dispatch(createOrderAsync(order));
      // need to redirect from here to a new page of order success.
    } else {
      // TODO : we can use proper messaging popup here
      alert("Enter Address and Payment method");
    }
    //TODO: Add success message and redirect to order confirmation page
    // Clear the cart after order is placed
    //On server need to handle stock update and order creation
  };
  return (
    <>
      {!item.length && <Navigate to="/cart" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();

                console.log("Form submitted with data:", data);
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-3xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          {...register("name", {
                            required: "Name could not be blank...",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email could not be blank...",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Please enter a valid email address.",
                            },
                          })}
                          type="email"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="country"
                          {...register("country", {
                            required: "country could not be blank...",
                          })}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option>India</option>
                          <option>Australia</option>
                          <option>Newziland</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register("street", {
                            required: "Street Address could not be blank...",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", {
                            required: "City could not be blank...",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          {...register("state", {
                            required: "state could not be blank...",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP / Pin / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          {...register("pinCode", {
                            required:
                              "Postal-Code/Zip Code  could not be blank...",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone number could not be blank...",
                          })}
                          type="tel"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Address
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Choose an address from your saved addresses
                  </p>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      {/* <ul role="list" className="divide-y divide-gray-100">
                        {user.addresses.map((address) => (
                          <li
                            key={address.name}
                            className="flex justify-between gap-x-6 px-6 py-5 border-solid border-2 border-gray-200"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <input
                                name="address"
                                type="radio"
                                className="h-4 w-4 relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">
                                  Road: {address.street}
                                </p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">
                                  ZipCode : {address.pinCode}
                                </p>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                Phone : {address.phone}
                              </p>
                              <p className="text-sm leading-6 text-gray-500">
                                {address.city}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul> */}
                      <div className="grid gap-6 md:grid-cols-2">
                        {user.addresses.map((address, index) => (
                          <label
                            key={index}
                            className="group block border rounded-xl p-5 cursor-pointer transition-shadow duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500"
                          >
                            <div className="flex items-start gap-4">
                              <input
                                type="radio"
                                onChange={handleAddress}
                                name="address"
                                value={index}
                                className="mt-1 h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                              />
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {address.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {address.street}, {address.city},{" "}
                                  {address.pinCode}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  Phone: {address.phone}
                                </p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mt-8">
                        Payment Method
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        Choose one payment method
                      </p>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {/* <div className="flex items-center gap-x-3">
                          <input
                            defaultChecked
                            id="cash"
                            name="payments"
                            type="radio"
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            type="radio"
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div> */}

                        <div className="flex items-center gap-x-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
                          <input
                            onChange={handlePayment}
                            id="cash"
                            value="cash"
                            name="payments"
                            type="radio"
                            className="h-5 w-5 accent-indigo-600"
                            checked={paymentMethod === "cash" ? true : false}
                          />
                          <label
                            htmlFor="cash"
                            className="flex flex-col cursor-pointer"
                          >
                            <span className="text-base font-medium text-gray-900">
                              💵 Cash
                            </span>
                            <span className="text-sm text-gray-500">
                              Pay with cash on delivery
                            </span>
                          </label>
                        </div>

                        {/* Card Option */}
                        <div className="flex items-center gap-x-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
                          <input
                            id="card"
                            onChange={handlePayment}
                            name="payments"
                            type="radio"
                            value="card"
                            checked={paymentMethod === "card" ? true : false}
                            className="h-5 w-5 accent-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="flex flex-col cursor-pointer"
                          >
                            <span className="text-base font-medium text-gray-900">
                              💳 Card Payment
                            </span>
                            <span className="text-sm text-gray-500">
                              Pay securely using card
                            </span>
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* For a time being we are adding entire cart.jsx contain in below div, later with actual data will delete all */}

          <div className="lg:col-span-2">
            <div className="mx-auto mt-12  bg-white max-w-7xl px-4 sm:px-0 lg:px-0">
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
                  <div
                    onClick={handleOrder}
                    className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Checkout;
