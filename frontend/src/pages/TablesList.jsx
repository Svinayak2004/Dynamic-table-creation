import { useEffect, useState } from "react";
import API from "../axios/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const TablesList = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTables = async () => {
      setLoading(true);
      try {
        const res = await API.get("/tables");
        setTables(res.data.data);
        console.log("Tables loaded:", res.data.data);
      } catch (err) {
        console.error("Error loading tables:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  const deleteTable = async (id) => {

    if (window.confirm("Are you sure you want to delete this table?")) {
      try {
        await API.delete(`/tables/${id}`);
        setTables(tables.filter((t) => t._id !== id));
        toast.success("Table deleted"); 
      } catch (err) {
        console.error("Error deleting table:", err);
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading tables...</p>;
  }
  return (
    <div className="p-6 bg-gradient-to-l from-blue-100 to-purple-400 min-h-screen">
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
              <span className="text-lg text-gray-800">{t.tableName}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/records/${t._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition"
                >
                  Manage
                </button>
                <button
                  onClick={() => deleteTable(t._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-medium transition"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablesList;
