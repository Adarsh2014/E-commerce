import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addToProductAsync,
  selectBrands,
  selectCategories,
  selectWeight,
} from "../../product-list/ProductSlice";

const ProductForm = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const weights = useSelector(selectWeight);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log(errors);
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          reset();

          console.log("Form submitted with data:", data);
          const product = { ...data };
          product.images = [product.image1, product.image2];
          delete product["image1"];
          delete product["image2"];
          console.log(product);
          dispatch(addToProductAsync(product));
        })}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            {...register("title", {
              required: "Title could not be blank...",
            })}
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Product Title"
          />
        </div>

        <div>
          <label
            htmlFor="discription"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("discription", {
              required: "Discription could not be blank...",
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Product Description"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("category", {
                required: "category could not be blank...",
              })}
            >
              <option value="">--Choose Category--</option>
              {categories.map((category) => (
                <option value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("brand", {
                required: "brand could not be blank...",
              })}
            >
              <option value="">--Choose Brand--</option>
              {brands.map((brand) => (
                <option value={brand.value}>{brand.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (g)
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("weight", {
                required: "weight could not be blank...",
              })}
            >
              <option value="">--Choose Weight--</option>
              {weights.map((weight) => (
                <option value={weight.value}>{weight.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <input
              {...register("price", {
                required: "price could not be blank...",
                min: 1,
                max: 10000,
              })}
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="$"
            />
          </div>

          <div>
            <label
              htmlFor="discountPercentage"
              className="block text-sm font-medium text-gray-700"
            >
              Discount (%)
            </label>
            <input
              {...register("discountPercentage", {
                required: "discountPercentage could not be blank...",
                min: 1,
                max: 100,
              })}
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="rating"
            >
              Rating
            </label>
            <input
              {...register("rating", {
                required: "price could not be blank...",
                min: 0,
                max: 5,
              })}
              type="number"
              step="0.01"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            {...register("stock", {
              required: "Stock could not be blank...",
              min: 0,
              max: 1000,
            })}
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="thumbnail"
          >
            Thumbnail URL
          </label>
          <input
            {...register("thumbnail", {
              required: "thumbnail could not be blank...",
            })}
            type="text"
            placeholder="https://example.com/thumb.jpg"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="image1"
          >
            Image URL 1
          </label>
          <input
            {...register("image1", {
              required: "images could not be blank...",
            })}
            type="text"
            placeholder="https://example.com/image.jpg"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="image2"
          >
            Image URL 2
          </label>
          <input
            {...register("image2")}
            type="text"
            placeholder="https://example.com/image.jpg"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md font-semibold text-sm shadow-sm"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
