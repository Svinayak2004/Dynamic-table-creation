import { useState } from "react";
import API from "../axios/api";
import AddColumn from "../components/AddColumn";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateTable() {
  const navigate = useNavigate();
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([]);

  const buildPayload = () =>
    columns.map((c) => ({
      columnName: c.columnName,
      dataType: c.dataType,
      inputType: c.inputType,
      label: c.label,
      constraints: {
        required: String(!!c.constraints?.required),
        unique: String(!!c.constraints?.unique),
      },
    }));

  const createTable = async () => {
    if (!tableName) return toast.error("Table name is required");
    if (!columns.length) return toast.error("Add at least one column");

    const columnPayload = buildPayload();

    if (columnPayload.some((c) => !c.columnName))
      return toast.error("Column name cannot be empty");

    try {
      const tableRes = await API.post("/tables", { tableName });

      const tableId = tableRes?.data?.data?._id;
      await API.post(`/columns/${tableId}`, columnPayload);

      toast.success("Table and columns created successfully");
      setTableName("");
      setColumns([]);
      navigate(`/records/${tableId}`);
    } catch (err) {
      const errData = err?.response?.data;
      toast.error(errData?.message || "Failed to create table");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-blue-100 to-purple-400 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTable();
        }}
        className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-gray-100 space-y-5"
      >
        <h2 className="text-xl font-bold text-center">Create Table</h2>

        <input
          className="w-full border-black-100 p-2 rounded shadow-md"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />

        <AddColumn columns={columns} setColumns={setColumns} />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Create Table
        </button>
      </form>
    </div>
  );
}
