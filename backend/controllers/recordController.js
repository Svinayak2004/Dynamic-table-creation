import asyncHandler from '../middleware/asyncHandler.js';
import Record from '../models/Record.js';
import Column from '../models/Column.js';

// create or add record
export const createRecord = asyncHandler(async (req, res) => {

    const tableId = req.params.tableId;
    if (!tableId) {
        res.status(400);
        throw new Error('tableId param is required');
    }
    const data = req.body;
    const columns = await Column.find({ table: tableId });
    console.log(columns.constriants);
    // validate requred constriants 
    for (let column of columns) {
        if (column.constraints.required && (data[column.columnName] === null || data[column.columnName] === "" || data[column.columnName] === undefined)) {
            res.status(400);
            throw new Error(`column ${column.columnName} is required`);
        }
    }
    //validate unique constraints
    for (let column of columns) {
        if(column.constraints.unique){
            const existingRecord = await Record.findOne({ table: tableId, [`data.${column.columnName}`]: data[column.columnName] });
            if(existingRecord){
                res.status(400);
                throw new Error(`column ${column.columnName} should be unique. record with value ${data[column.columnName]} already exists`);
            }
        }
    }
    const record = await Record.create({ table : tableId, data });
    res.status(201).json({
        success: true,
        message: 'record created',
        data: record
    });
});

//get records 
export const getRecords = asyncHandler(async (req, res) => {
    const tableId = req.params.tableId;
    if (!tableId) {
        res.status(400);
        throw new Error('tableId param is required');
    }
    const records = await Record.find({ table : tableId });  
    res.status(200).json({
        success: true,
        message: 'records fetched',
        data: records
    });
});

//get single record
export const getRecord = asyncHandler(async (req, res) => {
    console.log("Fetching record with id:", req.params.id);
    if (!req.params.id) {
        res.status(400);
        throw new Error('recordId param is required');
    }
    const record = await Record.findById(req.params.id);
    if (!record) {
        res.status(404);
        throw new Error('record not found');
    }
    res.status(200).json({
        success: true,
        message: 'record fetched',
        data: record
    });
});

//delete record
export const deleteRecord = asyncHandler(async (req, res) => {
    if (!req.params.recordId) {
        res.status(400);
        throw new Error('recordId param is required');
    }   
    const record = await Record.findByIdAndDelete(req.params.recordId);
    if (!record) {
        res.status(404);
        throw new Error('record not found');
    }
    res.status(200).json({
        success: true,
        message: 'record deleted',
        data: record
    });
});

// edit record
export const editRecord = asyncHandler(async (req, res) => {
    if(!req.params.recordId) {
        res.status(400);
        throw new Error('recordId param is required');
    }
    const data = req.body;
    const record = await Record.findById(req.params.recordId);
    if (!record) {
        res.status(404);
        throw new Error('record not found');
    }
    const updatedRecord = await Record.findByIdAndUpdate(req.params.recordId, { data }, { new: true });
    res.status(200).json({
        success: true,
        message: 'record updated',
        data: updatedRecord
    });
}); 

// 699bfd1e2a5c50c835cd2344