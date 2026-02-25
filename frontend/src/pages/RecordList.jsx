import { useEffect, useState } from "react";
import api from "../axios/api";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const RecordsList = () => {
  const { tableId } = useParams();
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    const res = await api.get(`/records/${tableId}`);
    console.log("Records loaded:", res.data.data);
    setRecords(res.data.data);
  }
  useEffect(() => {
    fetchRecords();
  }, [tableId]);

  return (
    <div className="p-6 bg-gradient-to-l from-blue-100 to-purple-400 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Records</h2>
          <button
            onClick={() => navigate(`/form/${tableId}`)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition"
          >
            Add Record
          </button>
        </div>

        {records.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            No records found. Create one to get started!
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {records.map((r) => (
              <div
                key={r._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg border border-gray-200 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 overflow-auto">
                    <pre className="text-sm text-gray-700 bg-gray-50 p-3 rounded overflow-auto max-h-40">
                      {JSON.stringify(r.data, null, 2)}
                    </pre>
                  </div>
                  <button
                    onClick={() => navigate(`/records/view/${r._id}`)}
                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition whitespace-nowrap"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordsList;