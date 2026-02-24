import { useEffect, useState } from "react";
import api from "../axios/api";
import { useParams } from "react-router-dom";
import DynamicInput from "../components/DynamicInput";

const DynamicForm = () => {
  const { tableId } = useParams();

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState({});

  // load columns
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await api.get(`/columns/${tableId}`);
        setColumns(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchColumns();
  }, [tableId]);

  // submit record
  const submit = async () => {
    try {
      await api.post(`/records/${tableId}`, data);
      alert("Record added");
      setData({});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-50 border rounded w-fit">
      <h2 className="text-xl font-bold">Add Record</h2>

      {columns.map(col => (
        <DynamicInput
          key={col._id}
          column={col}
          value={data[col.columnName] || ""}
          setData={setData}
        />
      ))}

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save
      </button>
    </div>
  );
};

export default DynamicForm;