import { useEffect } from "react";

const emptyColumn = () => ({
  columnName: "",
  label: "",
  dataType: "text",
  inputType: "text",
  constraints: { required: false, unique: false },
});

export default function AddColumn({ columns, setColumns }) {
  // If no columns exist yet, add one empty column for the user to fill.
  useEffect(() => {
    if (!columns || columns.length === 0) setColumns([emptyColumn()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addColumn = () => setColumns((prev) => [...prev, emptyColumn()]);

  const updateColumn = (index, field, value, isConstraint = false) => {
    setColumns((prev) =>
      prev.map((col, i) =>
        i === index
          ? isConstraint
            ? { ...col, constraints: { ...col.constraints, [field]: value } }
            : { ...col, [field]: value }
          : col
      )
    );
  };

  const removeColumn = (index) => setColumns((prev) => prev.filter((_, i) => i !== index));

  return (
    <div>
      <h3>Columns</h3>
      {columns.map((col, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <input
            placeholder="Column Name"
            value={col.columnName}
            onChange={(e) => updateColumn(index, "columnName", e.target.value)}
          />

          <input placeholder="Label" value={col.label} onChange={(e) => updateColumn(index, "label", e.target.value)} />

          <select value={col.dataType} onChange={(e) => updateColumn(index, "dataType", e.target.value)}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="boolean">Boolean</option>
          </select>

          <select value={col.inputType} onChange={(e) => updateColumn(index, "inputType", e.target.value)}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="checkbox">Checkbox</option>
          </select>

          <label style={{ marginLeft: 8 }}>
            Required
            <input
              type="checkbox"
              checked={!!col.constraints?.required}
              onChange={(e) => updateColumn(index, "required", e.target.checked, true)}
            />
          </label>

          <label style={{ marginLeft: 8 }}>
            Unique
            <input
              type="checkbox"
              checked={!!col.constraints?.unique}
              onChange={(e) => updateColumn(index, "unique", e.target.checked, true)}
            />
          </label>

          <div>
            <button type="button" onClick={() => removeColumn(index)} style={{ marginTop: 8 }}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addColumn}>
        Add Column
      </button>
    </div>
  );
}