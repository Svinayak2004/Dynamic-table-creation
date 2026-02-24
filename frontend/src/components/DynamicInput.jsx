import React from "react";

const DynamicInput = ({ column, value = "", setData }) => {
  const handleChange = (e) => {
    setData(prev => ({
      ...prev,
      [column.columnName]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      {/* Label */}
      <label className="font-medium">
        {column.label}
      </label>

      {/* Input */}
      <input
        type={column.inputType || "text"}
        name={column.columnName}
        value={value}
        onChange={handleChange}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default DynamicInput;