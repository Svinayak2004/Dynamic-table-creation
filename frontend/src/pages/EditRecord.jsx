import { useEffect, useState } from "react";
import api from "../axios/api";
import { useParams, useNavigate } from "react-router-dom";
import DynamicInput from "../components/DynamicInput";

const EditRecord = () => {

    const { recordId } = useParams();
    const navigate = useNavigate();

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState(null);
    const [tableId, setTableId] = useState("");

    // load record + columns
    useEffect(() => {

        const fetchData = async () => {
            try {

                // get record
                const recordRes = await api.get(`/records/get/${recordId}`);
                const record = recordRes.data.data;

                setData(record.data);
                setTableId(record.table);

                // get columns using table id
                const colRes = await api.get(`/columns/${record.table}`);
                setColumns(colRes.data.data);

            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchData();

    }, [recordId]);


    // update record
    const updateRecord = async () => {
        try {

            await api.put(`/records/${recordId}`, data);

            alert("Record updated successfully");
            navigate(-1);

        } catch (err) {
            console.error("Update error:", err);
        }
    };


    if (!data) return <p className="p-6">Loading...</p>;


    return (
        <div className="flex flex-col gap-4 p-6 bg-gray-50 border rounded w-fit">

            <h2 className="text-xl font-bold">Edit Record</h2>

            {columns.map(col => (
                <DynamicInput
                    key={col._id}
                    column={col}
                    value={data[col.columnName] || ""}
                    setData={setData}
                />
            ))}

            <button
                onClick={updateRecord}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Update
            </button>

        </div>
    );
};

export default EditRecord;