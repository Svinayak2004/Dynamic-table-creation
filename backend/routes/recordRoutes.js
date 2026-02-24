import { createRecord, getRecord, getRecords, deleteRecord, editRecord } from "../controllers/recordController.js";
import express from 'express';
const router = express.Router();


router.post('/:tableId', createRecord);
router.get('/get/:id', getRecord);
router.get('/:tableId', getRecords);
router.delete('/:recordId', deleteRecord);
router.put('/:recordId', editRecord);

export default router;