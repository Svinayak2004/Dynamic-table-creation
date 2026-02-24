import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import CreateTable from "./pages/createTable";
import TablesList from "./pages/TablesList";
import RecordsList from "./pages/RecordList";
import DynamicForm from "./pages/DynamicForm";
import RecordView from "./pages/RecordView";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route path="/" element={<TablesList />} />
        <Route path="/create-table" element={<CreateTable />} />
        <Route path="/record/:recordId" element={<RecordView />} />
        <Route path="/records/:tableId" element={<RecordsList />} />
        <Route path="/form/:tableId" element={<DynamicForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;