import asyncHandler from '../middleware/asyncHandler.js'
import Column from '../models/Column.js'

export const createColumns = asyncHandler(async (req, res) => {
    let columns = req.body;
    const tableId = req.params.tableId;

    if (!tableId) {
        res.status(400);
        throw new Error('tableId param is required');
    }

    if (!Array.isArray(columns)) columns = [columns];

    const editedColumn = columns.map(col => ({ ...col, table: tableId }));

    const savedColumns = await Column.insertMany(editedColumn);

    res.status(201).json({
        success: true,
        message: 'columns saved',
        data: savedColumns
    });
});

export const getColumns = asyncHandler(async (req, res) => {
    const tableId = req.params.tableId;

    if (!tableId) {
        res.status(400);
        throw new Error('tableId param is required');
    }

    const columns = await Column.find({ table: tableId });

    res.status(200).json({
        success: true,
        message: 'columns fetched',
        data: columns
    });
});

