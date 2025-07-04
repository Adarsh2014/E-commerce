import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { resetOrder } from "../order/orderSlice";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const OrderSuccessPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(resetCartAsync(user.id));
    dispatch(resetOrder());
  }, [dispatch, user]);

  if (!params.id) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-indigo-50 to-white py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="flex justify-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-800">
          Thank you! 🎉
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Your order was placed successfully.
        </p>

        <p className="mt-6 text-base font-medium text-gray-700">
          <span className="text-indigo-600 font-semibold">Order ID:</span> #
          {params?.id}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          You can view your order status and history in the orders section of
          your account.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="inline-block rounded-md bg-indigo-600 px-5 py-2 text-white font-medium text-sm hover:bg-indigo-700 transition"
          >
            Go to Home
          </Link>
          <a
            href="https://www.linkedin.com/in/adarsh14dubey/"
            className="inline-block text-sm font-medium mt-2 text-indigo-700 hover:underline"
          >
            Contact Support &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
