import { useEffect, useState } from "react";
import API from "../axios/api";
import { useNavigate, Link } from "react-router-dom";

const TablesList = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await API.get("/tables");
        setTables(res.data.data);
        console.log("Tables loaded:", res.data.data);
      } catch (err) {
        console.error("Error loading tables:", err);
      }
    };
    fetchTables();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Tables</h2>

        <Link
          to="/create-table"
          className="inline-block mb-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-medium"
        >
          + Create New Table
        </Link>
        <div className="flex flex-col gap-3 bg-white border-2 border-gray-200 p-6 rounded-lg shadow-md">
          {tables.map((t, index) => (
            <div
              key={t._id}
              className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded transition"
            >
              <span className="text-lg text-gray-800">
                {t.tableName}
              </span>
              <button
                onClick={() => navigate(`/records/${t._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition"
              >
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablesList;
