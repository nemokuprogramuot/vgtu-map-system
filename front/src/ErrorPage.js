import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-xl text-gray-700 mb-2">This page is not accessible.</p>
        <p className="text-sm text-gray-500">You might not have permission or the page doesn’t exist.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
