import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  return children;
}