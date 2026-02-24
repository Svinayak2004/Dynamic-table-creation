import { useEffect, useState } from "react";
import api from "../axios/api.js";
import { useParams } from "react-router-dom";
import DynamicInput from "../components/DynamicInput.jsx";

const DynamicForm = () => {
  const { tableId } = useParams();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState({});

  const fetchColumns = async () => {
    const res = await api.get(`/columns/${tableId}`);
    setColumns(res.data.data);
    console.log("Columns loaded:", res.data.data);
  };
 
  useEffect(() => {
    fetchColumns();
  }, []);

  const submit = async () => {
    await api.post(`/records/${tableId}`, data);
    setData({});
    alert("Record added");
  };

  return (
    <div className="flex flex-col gap-4 p-6 border-2 bg-gray-50 w-150 justify-center items-center ">
      <h2 className="text-xl font-bold">Add Record</h2>


      {columns.map((col) => (
        <DynamicInput key={col.id} column={col} setData={setData} />
      ))}

      <button onClick={submit} className ="bg-green-600 hover:bg-green-700 text-white w-20 py-2 rounded-md items-center">Save</button>
    </div>
  );
};

export default DynamicForm;
