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
    columns.map(c => ({
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

    if (columnPayload.some(c => !c.columnName))
      return toast.error("Column name cannot be empty");

    try {
      const tableRes = await API.post("/tables", { tableName });

      const tableId = tableRes?.data?.data?._id;
      await API.post(`/columns/${tableId}`, columnPayload);

      toast.success("Table and columns created successfully");
      setTableName("");
      setColumns([]);
      navigate('/records/:tableId');
    } catch (err) {
      const errData = err?.response?.data;

      if (errData?.code === 11000 || errData?.keyValue?.tableName) {
        const name = errData?.keyValue?.tableName || tableName;
        toast.error(`Table "${name}" already exists`);
      } else {
        toast.error(errData?.message || "Failed to create table");
      }
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        createTable();
      }}
      className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white space-y-5"
    >
      <h2 className="text-xl font-bold text-center">Create Table</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Table Name"
        value={tableName}
        onChange={e => setTableName(e.target.value)}
      />

      <AddColumn columns={columns} setColumns={setColumns} />

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Create Table
      </button>
    </form>
  );
}