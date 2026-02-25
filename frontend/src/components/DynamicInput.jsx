import React from "react";

const DynamicInput = ({ column, value = "", setData }) => {
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [column.columnName]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {column.label}
      </label>

      <input
        type={column.inputType || "text"}
        name={column.columnName}
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
};

export default DynamicInput;
