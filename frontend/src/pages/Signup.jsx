import React from 'react'
import API from '../axios/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await API.post('/auth/signup', formData);
      console.log(res.data);
      toast.success(res.data.message);
      navigate('/login');
    } catch (err) {
      const remoteMsg = err?.response?.data?.message;
      const text =
        typeof remoteMsg === "string"
          ? remoteMsg
          : remoteMsg?.message || (remoteMsg ? JSON.stringify(remoteMsg) : null) || err.message || "Signup failed. Please try again.";
      toast.error(text);
      console.log(err.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen w-full  bg-gray-100'>
      <form onSubmit={handleSubmit} className = "flex flex-col gap-4 border-2 p-4 rounded-sm w-98 bg-white shadow-md">
        <h1 className='text-2xl font-bold items-center'>Create an Account</h1>
        <input
          type="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handelChange}
          required
          className='p-1 items-center border-2'
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handelChange}
          required
          className='p-1 items-center border-2'
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handelChange}
          required
          className='p-1 items-center border-2'
        />
        <button type="submit" className='border-2 rounded-sm bg-blue-500 hover:bg-blue-400 p-1'>Signup</button>
        already have an account? <span className='text-blue-500 cursor-pointer hover:underline' onClick={() => navigate('/login')}>Login</span>
      </form>
    </div>
  )
}

export default Signup
