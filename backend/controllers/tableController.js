import asyncHandler from '../middleware/asyncHandler.js'
import Table from '../models/Table.js'

export const createTable = asyncHandler(async(req, res) => {
    const {tableName, description} = req.body;
    
    const table = await Table.create({
        tableName,
        description,
        user : req.user.id
    });
    
    res.status(201).json({
        success : true,
        message : 'table is created',
        data : table
    })
});

export const getTables = asyncHandler(async(req, res) => {
    
    const table = await Table.find({});
    if(!table){
        res.status(400);
        throw new Error("table not found")
    }
    
    res.status(201).json({
        success : true,
        message : 'table is created',
        data : table
    })
});

export const getTable = asyncHandler(async(req, res) => {
    const table = await Table.findById( req.params.id );
    if(!table){
        res.status(400);
        throw new Error("table not found")
    }
    
    res.status(201).json({
        success : true,
        message : 'table is created',
        data : table
    })
});

export const deleteTable = asyncHandler(async(req, res) => {
    const table = await Table.findByIdAndDelete( req.params.id );
    if(!table){
        res.status(400);
        throw new Error("table not found")
    }
    
    res.status(201).json({
        success : true,
        message : 'table deleted',
        data : table
    })
});
