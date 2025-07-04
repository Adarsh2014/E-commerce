import React from "react";

const About = () => {
  return (
    <div className="bg-white py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          About <span className="text-indigo-600">Our Store</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Welcome to our little corner of the internet. We're not a massive
          corporation— just passionate individuals who believe shopping online
          should feel personal, thoughtful, and delightful.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
        <img
          src="/heidi-fin-2TLREZi7BUg-unsplash.jpg"
          alt="ecommerce"
          className="w-full rounded-xl shadow-lg object-cover h-96"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            What We're About
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            This store was built with love, creativity, and a lot of coffee ☕.
            Every product you see has been hand-picked, tested, and shipped with
            care. From fashion to gadgets, we aim to offer something that sparks
            joy and fits your lifestyle.
          </p>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            As a personal project, this platform also reflects my journey as a
            developer— integrating modern tools like React, Redux, Tailwind, and
            backend APIs to create a full-stack shopping experience.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Our Mission
        </h2>
        <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
          To make online shopping simple, fast, and trustworthy. We’re here to
          build connections— not just transactions.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-16 text-center">
        <h2 className="text-xl font-medium text-gray-700 mb-2">
          Made with ❤️ by Adarsh
        </h2>
        <p className="text-sm text-gray-500">
          A developer-driven approach to building better shopping experiences.
        </p>
      </div>
    </div>
  );
};

export default About;
