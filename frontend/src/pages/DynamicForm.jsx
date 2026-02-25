import { useEffect, useState } from "react";
import api from "../axios/api";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import DynamicInput from "../components/DynamicInput";

const DynamicForm = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
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
      toast.success("Record added");
      setData({});
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add record");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-blue-100 to-purple-400 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Add Record</h2>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </div>

        {/* Dynamic Fields */}
        <div className="space-y-4">
          {columns.map((col) => (
            <DynamicInput
              key={col._id}
              column={col}
              value={data[col.columnName] || ""}
              setData={setData}
            />
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={submit}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Save Record
        </button>
      </div>
    </div>
  );
};

export default DynamicForm;
