import { useState } from "react";
import API from "../axios/api";
import AddColumn from "../components/AddColumn";
import toast from "react-hot-toast";

export default function CreateTable() {
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([]);

  // Build the payload exactly like you showed.
  const buildPayload = () =>
    columns.map((c) => ({
      columnName: c.columnName,
      dataType: c.dataType,
      inputType: c.inputType,
      label: c.label,
      // constraints must be strings "true" / "false"
      constraints: {
        required: String(!!c.constraints?.required),
        unique: String(!!c.constraints?.unique),
      },
    }));

  const createTable = async () => {
    if (!tableName) return toast.error("Table name is required");
    if (!columns || columns.length === 0) return toast.error("Add at least one column");

    const columnPayload = buildPayload();

    if (columnPayload.some((c) => !c.columnName)) return toast.error("Column name cannot be empty");

    try {
      // 1) create table (backend expects `tableName`)
      const tableRes = await API.post("/tables", { tableName: tableName });

      // 2) send all columns in one request
      await API.post(`/columns/${tableRes.data._id}`, columnPayload);

      toast.success("Table and columns created successfully");
      setTableName("");
      setColumns([]);
    } catch (err) {
      const errData = err?.response?.data;
      // If Mongo reports a duplicate key (11000) or provides keyValue.tableName, show a friendly message
      if (errData?.code === 11000 || errData?.keyValue?.tableName) {
        const name = errData?.keyValue?.tableName || tableName;
        toast.error(`Table name "${name}" already exists. Choose another name.`);
      } else {
        const msg = errData?.message || err.message || "Failed to create table";
        toast.error(typeof msg === "string" ? msg : JSON.stringify(msg));
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTable();
      }}
    >
      <h2>Create Table</h2>

      <input placeholder="Table Name" value={tableName} onChange={(e) => setTableName(e.target.value)} />

      <AddColumn columns={columns} setColumns={setColumns} />

      <button type="submit">Create Table</button>
    </form>
  );
}