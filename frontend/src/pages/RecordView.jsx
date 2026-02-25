import { useEffect, useState } from "react";
import api from "../axios/api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RecordView = () => {
  const { recordId } = useParams();
  console.log("RecordView mounted with id:", recordId);
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  const fetchRecord = async () => {
    try {
      const res = await api.get(`/records/get/${recordId}`);
      console.log("Record loaded:", res.data.data);
      setRecord(res.data.data);
    } catch (err) {
      console.error("Error loading record:", err);
    }
  };
  useEffect(() => {
    fetchRecord();
  }, [recordId]);

  const deleteRecord = async () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await api.delete(`/records/${recordId}`);
        toast.success("Record deleted");
        navigate(-1);
      } catch (err) {
        console.error("Error deleting record:", err);
      }
    }
  };

  if (!record) return null;

  return (
    <div className="flex flex-col p-6 bg-gradient-to-l from-blue-100 to-purple-400 min-h-screen ">
      <div className="flex flex-col mt-30 mx-auto p-6 bg-gray-100 border rounded-md w-fit">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold">Record</span>
        <span
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          go back
        </span>
        </div>

        {Object.entries(record.data).map(([key, value]) => (
          <p key={key}>
            <b>{key}</b>: {value}
          </p>
        ))}

        <div className="flex gap-5 mt-5">
          <button
            onClick={deleteRecord}
            className="bg-red-600 hover:bg-red-700 text-white w-20 py-2 rounded-md items-center mt-2"
          >
            Delete
          </button>

          <button
            onClick={() => navigate(`/records/edit/${recordId}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-20 py-2 rounded-md mt-2"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordView;
