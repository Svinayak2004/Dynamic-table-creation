import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";

import CreateTable from "./pages/createTable";
import TablesList from "./pages/TablesList";
import RecordsList from "./pages/RecordList";
import DynamicForm from "./pages/DynamicForm";
import RecordView from "./pages/RecordView";
import EditRecord from "./pages/EditRecord"

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tables" element={<ProtectRoute><TablesList /></ProtectRoute>} />
        <Route path="/create-table" element={<ProtectRoute><CreateTable /></ProtectRoute>} />
        <Route path="/records/edit/:recordId" element={<ProtectRoute><EditRecord /></ProtectRoute>} />
        <Route path="/records/view/:recordId" element={<ProtectRoute><RecordView /></ProtectRoute>} />
        <Route path="/records/:tableId" element={<ProtectRoute><RecordsList /></ProtectRoute>} />
        <Route path="/form/:tableId" element={<ProtectRoute><DynamicForm /></ProtectRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;