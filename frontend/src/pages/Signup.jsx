import React from "react";
import API from "../axios/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", formData);
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Signup failed. Please try again.",
      );
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-blue-100 to-purple-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign up to start managing your tables
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handelChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handelChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handelChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
        >
          Signup
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
