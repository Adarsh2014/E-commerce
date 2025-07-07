import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { selectUserInfo, updateUserAsync } from "../userSlice"; // Assuming correct path to userSlice
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const user = useSelector(selectUserInfo); // Assuming user object is structured correctly
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const handleEdit = (addressUpdate, index) => {
    // Create a deep copy of addresses to ensure immutability for Redux
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1); // Close edit form after update
    reset(); // Clear form fields
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    // Create a deep copy of addresses for immutability
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1); // Remove 1 item at 'index'
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setShowAddAddressForm(false); // Ensure add form is closed if editing
    setSelectedEditIndex(index);
    const address = user.addresses[index];

    setValue("name", address.name || "");
    setValue("email", address.email || "");
    setValue("country", address.country || "");
    setValue("street", address.street || "");
    setValue("city", address.city || "");
    setValue("state", address.state || "");
    setValue("pinCode", address.pinCode || "");
    setValue("phone", address.phone || "");
  };

  const handleAdd = (address) => {
    const newUser = {
      ...user,
      addresses: [...user.addresses, { ...address, id: Date.now() }],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false); // Close add form after submission
    reset(); // Clear form fields
  };

  if (!user) {
    return (
      <p className="text-center py-10 text-gray-700 text-xl font-medium">
        Loading user profile...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Profile Header */}
        <div className="px-6 py-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <img
            alt="User Avatar"
            src="/man-user-circle-icon.svg"
            className="h-20 w-20 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <h2 className="text-3xl font-extrabold flex items-center gap-2">
              {user.name || "New User"}
            </h2>
            <p className="text-lg opacity-90 mt-1">{user.email}</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 sm:p-8">
          {/* Add New Address Button */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <button
              type="button" // Changed to type="button" to prevent accidental form submission
              onClick={() => {
                setShowAddAddressForm(!showAddAddressForm); // Toggle form visibility
                setSelectedEditIndex(-1); // Ensure no edit form is open
                reset(); // Clear form fields when opening/closing add form
              }}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out text-base"
            >
              {showAddAddressForm ? "Cancel Add Address" : "Add New Address"}
            </button>
          </div>

          {/* Add New Address Form */}
          {showAddAddressForm && (
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Add New Address
              </h3>
              <form noValidate onSubmit={handleSubmit(handleAdd)}>
                <div className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="border-b border-gray-900/10 pb-8">
                    <p className="mt-2 text-sm text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      {/* Full Name */}
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            {...register("name", {
                              required: "Name is required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address.",
                              },
                            })}
                            type="email"
                            className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Country */}
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <div className="mt-2">
                          <select
                            id="country"
                            {...register("country", {
                              required: "Country is required",
                            })}
                            className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                          >
                            <option>India</option>
                            <option>Australia</option>
                            <option>New Zealand</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                          {errors.country && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.country.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Street address */}
                      <div className="col-span-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            id="street"
                            {...register("street", {
                              required: "Street address is required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                          />
                          {errors.street && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.street.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* City */}
                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            id="city"
                            {...register("city", {
                              required: "City is required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                          />
                          {errors.city && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* State */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            id="state"
                            {...register("state", {
                              required: "State is required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                          />
                          {errors.state && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ZIP / Pin / Postal code */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Pin / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            id="pinCode"
                            {...register("pinCode", {
                              required: "Postal Code is required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                          />
                          {errors.pinCode && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.pinCode.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "Phone number is required",
                            })}
                            type="tel"
                            className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="mt-6 flex items-center justify-end gap-x-4">
                    {" "}
                    {/* Adjusted gap */}
                    <button
                      type="button" // Changed to type="button"
                      onClick={() => setShowAddAddressForm(false)}
                      className="px-4 py-2 text-sm font-semibold text-gray-900 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Shipping Addresses List */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 border-b pb-4 mt-8">
            {" "}
            {/* Added border-b and pb */}
            <MapPinIcon className="w-6 h-6 text-indigo-600" />{" "}
            {/* Increased icon size slightly */}
            Your Shipping Addresses
          </h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {" "}
            {/* Adjusted grid for more columns on larger screens */}
            {user && user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((address, index) => (
                <div key={address.id || index} className="relative">
                  {" "}
                  {/* Use address.id for key, fallback to index */}
                  {selectedEditIndex === index ? (
                    // Edit Address Form (similar styling to Add form)
                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Edit Address
                      </h3>
                      <form
                        noValidate
                        onSubmit={handleSubmit((data) =>
                          handleEdit(data, index)
                        )}
                      >
                        <div className="space-y-8">
                          <div className="border-b border-gray-900/10 pb-8">
                            <p className="mt-2 text-sm text-gray-600">
                              Update the address details below.
                            </p>

                            <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              {/* Full Name */}
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="edit-name"
                                  className="block text-sm/6 font-medium leading-6 text-gray-900"
                                >
                                  Full Name
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="edit-name"
                                    {...register("name", {
                                      required: "Name is required",
                                    })}
                                    type="text"
                                    className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                                  />
                                  {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.name.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Email */}
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="edit-email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Email address
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="edit-email"
                                    {...register("email", {
                                      required: "Email is required",
                                      pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message:
                                          "Please enter a valid email address.",
                                      },
                                    })}
                                    type="email"
                                    className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                                  />
                                  {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.email.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Country */}
                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="edit-country"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Country
                                </label>
                                <div className="mt-2">
                                  <select
                                    id="edit-country"
                                    {...register("country", {
                                      required: "Country is required",
                                    })}
                                    className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                                  >
                                    <option>India</option>
                                    <option>Australia</option>
                                    <option>New Zealand</option>
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                  </select>
                                  {errors.country && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.country.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Street address */}
                              <div className="col-span-full">
                                <label
                                  htmlFor="edit-street"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Street address
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="edit-street"
                                    {...register("street", {
                                      required: "Street address is required",
                                    })}
                                    type="text"
                                    className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                                  />
                                  {errors.street && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.street.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* City */}
                              <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                  htmlFor="edit-city"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  City
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="edit-city"
                                    {...register("city", {
                                      required: "City is required",
                                    })}
                                    type="text"
                                    className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                                  />
                                  {errors.city && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.city.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* State */}
                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="edit-state"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  State / Province
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="edit-state"
                                    {...register("state", {
                                      required: "State is required",
                                    })}
                                    type="text"
                                    className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                                  />
                                  {errors.state && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.state.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* ZIP / Pin / Postal code */}
                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="edit-pinCode"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  ZIP / Pin / Postal code
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="edit-pinCode"
                                    {...register("pinCode", {
                                      required: "Postal Code is required",
                                    })}
                                    type="text"
                                    className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                                  />
                                  {errors.pinCode && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.pinCode.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Phone Number */}
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="edit-phone"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Phone Number
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="edit-phone"
                                    {...register("phone", {
                                      required: "Phone number is required",
                                    })}
                                    type="tel"
                                    className="block w-full rounded-md border-gray-300 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /* py-2.5 for better height */
                                  />
                                  {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.phone.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Form Action Buttons */}
                          <div className="mt-6 flex items-center justify-end gap-x-4">
                            <button
                              type="button" // Changed to type="button"
                              onClick={() => setSelectedEditIndex(-1)}
                              className="px-4 py-2 text-sm font-semibold text-gray-900 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-150 ease-in-out"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            >
                              Edit Address
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    // Display Address Card
                    <div className="border rounded-lg p-5 bg-gray-50 hover:shadow-md transition-shadow duration-200 ease-in-out">
                      {" "}
                      {/* REMOVED h-full, flex, flex-col, justify-between */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {address.name}
                        </h4>
                        <p className="text-sm text-gray-700">
                          {address.street}, {address.city}, {address.pinCode}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                          {" "}
                          {/* Increased gap */}
                          <PhoneIcon className="h-4 w-4 text-gray-500" />
                          {address.phone}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end gap-4">
                        {" "}
                        {/* Aligned buttons to the right, added gap */}
                        <button
                          type="button"
                          onClick={() => handleEditForm(index)}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleRemove(e, index)}
                          className="text-sm font-medium text-red-600 hover:text-red-500 transition duration-150 ease-in-out" // Changed to red for remove
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-base text-gray-500 mt-4 italic col-span-full">
                No addresses found. Click "Add New Address" to add one.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
// import { selectUserInfo, updateUserAsync } from "../userSlice";
// import { useForm } from "react-hook-form";

// const UserProfile = () => {
//   const dispatch = useDispatch();
//   const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
//   const [showAddAddressForm, setShowAddAddressForm] = useState(false);
//   const user = useSelector(selectUserInfo);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();
//   console.log(errors);
//   const handleEdit = (addressUpdate, index) => {
//     const newUser = { ...user, addresses: [...user.addresses] }; //for shallow copy

//     newUser.addresses.splice(index, 1, addressUpdate);
//     dispatch(updateUserAsync(newUser));
//     setSelectedEditIndex(-1);
//   };
//   const handleRemove = (e, index) => {
//     const newUser = { ...user, addresses: [...user.addresses] }; //for shallow copy

//     newUser.addresses.splice(index, 1);
//     dispatch(updateUserAsync(newUser));
//   };

//   const handleEditForm = (index) => {
//     setSelectedEditIndex(index);
//     const address = user.addresses[index];
//     setValue("name", address.name);
//     setValue("email", address.email);
//     setValue("country", address.country);
//     setValue("street", address.street);
//     setValue("city", address.city);
//     setValue("state", address.state);
//     setValue("pinCode", address.pinCode);
//     setValue("phone", address.phone);
//   };

//   const handleAdd = (address) => {
//     const newUser = { ...user, addresses: [...user.addresses, address] };
//     dispatch(updateUserAsync(newUser));
//     setShowAddAddressForm(false);
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
//       <div className="rounded-xl shadow-sm bg-white border border-gray-200 overflow-hidden">
//         {/* Profile Header */}
//         <div className="px-6 py-8 bg-indigo-50 flex items-center gap-4 sm:gap-6">
//           <img
//             alt="User"
//             src="/man-user-circle-icon.svg"
//             className="h-12 w-12 rounded-full bg-white border p-1"
//           />
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               {user.name || "New User"}
//             </h2>
//             <p className="text-sm mt-1 text-gray-600">{user.email}</p>
//           </div>
//         </div>

//         {/* Address Section */}
//         <div className="px-6 py-6">
//           <button
//             type="submit"
//             onClick={() => {
//               setShowAddAddressForm(true);
//               setSelectedEditIndex(-1);
//             }}
//             className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Add New Address
//           </button>

//           {showAddAddressForm ? (
//             <form
//               className="bg-white px-5 py-12 mt-12"
//               noValidate
//               onSubmit={handleSubmit((data) => {
//                 console.log(data);
//                 handleAdd(data);
//                 reset();

//                 console.log("Form submitted with data:", data);
//               })}
//             >
//               <div className="space-y-12">
//                 <div className="border-b border-gray-900/10 pb-12">
//                   <h2 className="text-3xl font-semibold text-gray-900">
//                     Personal Information
//                   </h2>
//                   <p className="mt-1 text-sm/6 text-gray-600">
//                     Use a permanent address where you can receive mail.
//                   </p>

//                   <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                     <div className="sm:col-span-4">
//                       <label
//                         htmlFor="name"
//                         className="block text-sm/6 font-medium text-gray-900"
//                       >
//                         Full Name
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="name"
//                           {...register("name", {
//                             required: "Name could not be blank...",
//                           })}
//                           type="text"
//                           className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                         />
//                       </div>
//                     </div>

//                     <div className="sm:col-span-4">
//                       <label
//                         htmlFor="email"
//                         className="block text-sm/6 font-medium text-gray-900"
//                       >
//                         Email address
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="email"
//                           {...register("email", {
//                             required: "Email could not be blank...",
//                             pattern: {
//                               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                               message: "Please enter a valid email address.",
//                             },
//                           })}
//                           type="email"
//                           className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                         />
//                       </div>
//                     </div>

//                     <div className="sm:col-span-3">
//                       <label
//                         htmlFor="country"
//                         className="block text-sm/6 font-medium text-gray-900"
//                       >
//                         Country
//                       </label>
//                       <div className="mt-2 grid grid-cols-1">
//                         <select
//                           id="country"
//                           {...register("country", {
//                             required: "country could not be blank...",
//                           })}
//                           className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                         >
//                           <option>India</option>
//                           <option>Australia</option>
//                           <option>Newziland</option>
//                           <option>United States</option>
//                           <option>Canada</option>
//                           <option>Mexico</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div className="col-span-full">
//                       <label
//                         htmlFor="street-address"
//                         className="block text-sm/6 font-medium text-gray-900"
//                       >
//                         Street address
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="street"
//                           {...register("street", {
//                             required: "Street Address could not be blank...",
//                           })}
//                           type="text"
//                           className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                         />
//                       </div>
//                     </div>

//                     <div className="sm:col-span-2 sm:col-start-1">
//                       <label
//                         htmlFor="city"
//                         className="block text-sm/6 font-medium text-gray-900"
//                       >
//                         City
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="city"
//                           {...register("city", {
//                             required: "City could not be blank...",
//                           })}
//                           type="text"
//                           className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                         />
//                       </div>
//                     </div>

//                     <div className="sm:col-span-2">
//                       <label
//                         htmlFor="state"
//                         className="block text-sm/6 font-medium text-gray-900"
//                       >
//                         State
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="state"
//                           {...register("state", {
//                             required: "state could not be blank...",
//                           })}
//                           type="text"
//                           className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                         />
//                       </div>
//                     </div>

//                     <div className="sm:col-span-2">
//                       <label
//                         htmlFor="pinCode"
//                         className="block text-sm/6 font-medium text-gray-900"
//                       >
//                         ZIP / Pin / Postal code
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="pinCode"
//                           {...register("pinCode", {
//                             required:
//                               "Postal-Code/Zip Code  could not be blank...",
//                           })}
//                           type="text"
//                           className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                         />
//                       </div>
//                     </div>

//                     <div className="sm:col-span-4">
//                       <label
//                         htmlFor="phone"
//                         className="block text-sm/6 font-medium text-gray-900"
//                       >
//                         Phone Number
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="phone"
//                           {...register("phone", {
//                             required: "Phone number could not be blank...",
//                           })}
//                           type="tel"
//                           className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-6 flex items-center justify-end gap-x-6">
//                   <button
//                     onClick={() => setShowAddAddressForm(false)}
//                     type="button"
//                     className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   >
//                     Add Address
//                   </button>
//                 </div>
//               </div>
//             </form>
//           ) : null}
//           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//             <MapPinIcon className="w-5 h-5 text-indigo-600" />
//             Shipping Addresses
//           </h3>

//           <div className="grid gap-6 md:grid-cols-2">
//             {user.addresses.map((address, index) => (
//               <div key={index}>
//                 {selectedEditIndex === index ? (
//                   <form
//                     className="bg-white px-5 py-12 mt-12"
//                     noValidate
//                     onSubmit={handleSubmit((data) => {
//                       console.log(data);
//                       handleEdit(data, index);
//                       reset();

//                       console.log("Form submitted with data:", data);
//                     })}
//                   >
//                     <div className="space-y-12">
//                       <div className="border-b border-gray-900/10 pb-12">
//                         <h2 className="text-3xl font-semibold text-gray-900">
//                           Personal Information
//                         </h2>
//                         <p className="mt-1 text-sm/6 text-gray-600">
//                           Use a permanent address where you can receive mail.
//                         </p>

//                         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                           <div className="sm:col-span-4">
//                             <label
//                               htmlFor="name"
//                               className="block text-sm/6 font-medium text-gray-900"
//                             >
//                               Full Name
//                             </label>
//                             <div className="mt-2">
//                               <input
//                                 id="name"
//                                 {...register("name", {
//                                   required: "Name could not be blank...",
//                                 })}
//                                 type="text"
//                                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               />
//                             </div>
//                           </div>

//                           <div className="sm:col-span-4">
//                             <label
//                               htmlFor="email"
//                               className="block text-sm/6 font-medium text-gray-900"
//                             >
//                               Email address
//                             </label>
//                             <div className="mt-2">
//                               <input
//                                 id="email"
//                                 {...register("email", {
//                                   required: "Email could not be blank...",
//                                   pattern: {
//                                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                     message:
//                                       "Please enter a valid email address.",
//                                   },
//                                 })}
//                                 type="email"
//                                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               />
//                             </div>
//                           </div>

//                           <div className="sm:col-span-3">
//                             <label
//                               htmlFor="country"
//                               className="block text-sm/6 font-medium text-gray-900"
//                             >
//                               Country
//                             </label>
//                             <div className="mt-2 grid grid-cols-1">
//                               <select
//                                 id="country"
//                                 {...register("country", {
//                                   required: "country could not be blank...",
//                                 })}
//                                 className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               >
//                                 <option>India</option>
//                                 <option>Australia</option>
//                                 <option>Newziland</option>
//                                 <option>United States</option>
//                                 <option>Canada</option>
//                                 <option>Mexico</option>
//                               </select>
//                             </div>
//                           </div>

//                           <div className="col-span-full">
//                             <label
//                               htmlFor="street-address"
//                               className="block text-sm/6 font-medium text-gray-900"
//                             >
//                               Street address
//                             </label>
//                             <div className="mt-2">
//                               <input
//                                 id="street"
//                                 {...register("street", {
//                                   required:
//                                     "Street Address could not be blank...",
//                                 })}
//                                 type="text"
//                                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               />
//                             </div>
//                           </div>

//                           <div className="sm:col-span-2 sm:col-start-1">
//                             <label
//                               htmlFor="city"
//                               className="block text-sm/6 font-medium text-gray-900"
//                             >
//                               City
//                             </label>
//                             <div className="mt-2">
//                               <input
//                                 id="city"
//                                 {...register("city", {
//                                   required: "City could not be blank...",
//                                 })}
//                                 type="text"
//                                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               />
//                             </div>
//                           </div>

//                           <div className="sm:col-span-2">
//                             <label
//                               htmlFor="state"
//                               className="block text-sm/6 font-medium text-gray-900"
//                             >
//                               State
//                             </label>
//                             <div className="mt-2">
//                               <input
//                                 id="state"
//                                 {...register("state", {
//                                   required: "state could not be blank...",
//                                 })}
//                                 type="text"
//                                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               />
//                             </div>
//                           </div>

//                           <div className="sm:col-span-2">
//                             <label
//                               htmlFor="pinCode"
//                               className="block text-sm/6 font-medium text-gray-900"
//                             >
//                               ZIP / Pin / Postal code
//                             </label>
//                             <div className="mt-2">
//                               <input
//                                 id="pinCode"
//                                 {...register("pinCode", {
//                                   required:
//                                     "Postal-Code/Zip Code  could not be blank...",
//                                 })}
//                                 type="text"
//                                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               />
//                             </div>
//                           </div>

//                           <div className="sm:col-span-4">
//                             <label
//                               htmlFor="phone"
//                               className="block text-sm/6 font-medium text-gray-900"
//                             >
//                               Phone Number
//                             </label>
//                             <div className="mt-2">
//                               <input
//                                 id="phone"
//                                 {...register("phone", {
//                                   required:
//                                     "Phone number could not be blank...",
//                                 })}
//                                 type="tel"
//                                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-6 flex items-center justify-end gap-x-6">
//                         <button
//                           onClick={() => setSelectedEditIndex(-1)}
//                           type="button"
//                           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           type="submit"
//                           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                         >
//                           Edit Address
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 ) : null}

//                 <div className="border rounded-lg p-5 bg-gray-50 hover:shadow-md transition-shadow">
//                   <h4 className="text-base font-semibold text-gray-900 mb-1">
//                     {address.name}
//                   </h4>
//                   <p className="text-sm text-gray-700">
//                     {address.street}, {address.city}, {address.pinCode}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
//                     <PhoneIcon className="h-4 w-4" />
//                     {address.phone}
//                   </p>
//                   <div className="hidden sm:flex sm:flex-row sm:item-end">
//                     <button
//                       type="button"
//                       onClick={() => handleEditForm(index)}
//                       className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       type="button"
//                       onClick={(e) => handleRemove(e, index)}
//                       className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {user.addresses.length === 0 && (
//             <p className="text-sm text-gray-500 mt-4 italic">
//               No addresses found. You can add one during checkout.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
