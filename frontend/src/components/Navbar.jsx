
import API from "../axios/api"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  if (localStorage.getItem("user") && !isLoggedIn) {
    setIsLoggedIn(true);
  }
  const handleLogout = async  () => {
    
    await API.post("/auth/logout");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">
        <Link to="/">Dynamic Table Generator</Link>
      </div>
      <div  className="flex gap-4">
        <Link to="/create-table">Create Table</Link>
        <Link to="/tables">Tables</Link>
        {isLoggedIn ? (
          <span className="flex gap-2">
            <button
              onClick={handleLogout}>
              Logout
            </button>
          </span>
        ) : (
          <Link
            to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
