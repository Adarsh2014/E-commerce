import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectuserOrder,
} from "../userSlice";

import {
  TruckIcon,
  CreditCardIcon,
  CheckBadgeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const UserOrder = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectuserOrder);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [dispatch, user]);

  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">My Orders</h2>
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl shadow-md border border-gray-200">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329450.png"
              alt="No Orders"
              className="w-32 h-32 mb-6 opacity-80"
            />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Orders Found
            </h3>
            <p className="text-sm text-gray-500 max-w-md">
              Looks like you haven't placed any orders yet. Once you do, all
              your order details will appear here.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-medium shadow hover:bg-indigo-500 transition"
            >
              Start Shopping
            </Link>
          </div>
        )}
        {orders.map((order) => (
          <div
            key={order.id}
            className="mb-12 rounded-xl shadow-sm bg-white border border-gray-200"
          >
            <div className="px-6 py-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <h2 className="text-xl font-semibold text-indigo-600 flex items-center gap-2">
                <CheckBadgeIcon className="h-6 w-6 text-indigo-500" />
                Order # {order.id}
              </h2>
              <p className="text-base font-medium text-red-700 mt-2 flex items-center gap-2">
                <TruckIcon className="h-5 w-5 text-red-600" />
                Status: {order.status}
              </p>
            </div>

            <ul className="divide-y divide-gray-100 px-6 py-4">
              {order.item.map((product) => (
                <li
                  key={product.id}
                  className="flex py-6 gap-4 sm:gap-6 items-center"
                >
                  <div className="size-24 sm:size-28 overflow-hidden rounded-lg border border-gray-300">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">
                          {product.title}
                        </h4>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                      <p className="text-base font-semibold text-gray-800">
                        ${product.price}
                      </p>
                    </div>
                    <p className="text-sm mt-2 text-gray-600">
                      Quantity:{" "}
                      <span className="font-medium text-gray-900">
                        {product.quantity}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t px-6 py-4 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                Total Items:{" "}
                <span className="font-semibold text-gray-900">
                  {order.totalItems}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Subtotal:{" "}
                <span className="font-semibold text-gray-900">
                  ${order.sum}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100">
              <p className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5 text-indigo-500" />
                Payment Mode:{" "}
                <span className="text-gray-900 ml-1 font-medium">
                  {order.paymentMethod}
                </span>
              </p>
            </div>

            <div className="px-6 pb-6">
              <h3 className="text-base font-semibold text-gray-700 mb-2 mt-3 flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-indigo-500" />
                Shipping Address
              </h3>
              <div className="border rounded-xl p-4 bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-900">
                  {order.selectedAddress.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {order.selectedAddress.street}, {order.selectedAddress.city} -{" "}
                  {order.selectedAddress.pinCode}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <PhoneIcon className="h-4 w-4" />
                  {order.selectedAddress.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrder;
