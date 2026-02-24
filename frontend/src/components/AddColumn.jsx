import { useEffect } from "react";

const emptyColumn = () => ({
  columnName: "",
  label: "",
  dataType: "string",
  inputType: "text",
  constraints: { required: false, unique: false },
});

export default function AddColumn({ columns, setColumns }) {
  useEffect(() => {
    if (!columns || columns.length === 0) setColumns([emptyColumn()]);
  }, []);

  const addColumn = () => setColumns(prev => [...prev, emptyColumn()]);

  const updateColumn = (index, field, value, isConstraint = false) => {
    setColumns(prev =>
      prev.map((col, i) =>
        i === index
          ? isConstraint
            ? { ...col, constraints: { ...col.constraints, [field]: value } }
            : { ...col, [field]: value }
          : col
      )
    );
  };

  const removeColumn = index =>
    setColumns(prev => prev.filter((_, i) => i !== index));

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Columns</h3>

      {columns.map((col, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 mb-4 bg-white shadow-sm space-y-3"
        >
          <input
            className="w-full border p-2 rounded"
            placeholder="Column Name"
            value={col.columnName}
            onChange={e => updateColumn(index, "columnName", e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Label"
            value={col.label}
            onChange={e => updateColumn(index, "label", e.target.value)}
          />

          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Data Type</label>
              <select
                className="border p-2 rounded w-40"
                value={col.dataType}
                onChange={e => updateColumn(index, "dataType", e.target.value)}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="boolean">Boolean</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Input Type</label>
              <select
                className="border p-2 rounded w-40"
                value={col.inputType}
                onChange={e => updateColumn(index, "inputType", e.target.value)}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!col.constraints?.required}
                onChange={e =>
                  updateColumn(index, "required", e.target.checked, true)
                }
              />
              Required
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!col.constraints?.unique}
                onChange={e =>
                  updateColumn(index, "unique", e.target.checked, true)
                }
              />
              Unique
            </label>
          </div>

          <button
            type="button"
            onClick={() => removeColumn(index)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addColumn}
        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
      >
        Add Column
      </button>
    </div>
  );
}