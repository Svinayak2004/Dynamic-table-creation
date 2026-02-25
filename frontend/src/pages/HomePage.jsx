import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-l from-blue-100 to-purple-400">
      <h1 className="text-3xl font-bold mb-4">Dynamic Table Generator</h1>
      {localStorage.getItem("user") ? (
        <Link
          to="/tables"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition"
        >
          View My Tables
        </Link>
      ) : (
        <Link
          to="/login"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-medium transition"
        >
          Login to Create Tables
        </Link>
      )}
    </div>
  );
};

export default HomePage;
