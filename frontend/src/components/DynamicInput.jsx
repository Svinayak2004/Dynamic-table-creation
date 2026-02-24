import React from "react";

const DynamicInput = ({ column, setData }) => {
  return (
    <div className="flex flex-col gap-3 justify-between items-center">
      <div>
        <label>{column.label} : </label>

        {/* Input */}
        <input
          type={column.inputType || "text"} // fallback to text
          name={column.columnName}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              [column.columnName]: e.target.value,
            }))
          }
          className="border p-1 rounded w-98 ml-4 "
        />
      </div>
    </div>
  );
};

export default DynamicInput;
