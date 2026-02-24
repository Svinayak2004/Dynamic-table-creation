import {createTable, getTable, getTables, deleteTable} from '../controllers/tableController.js';
import auth from '../middleware/authMiddleware.js'
import express from 'express';
const router = express.Router();

router.post('/', auth, createTable);
router.get('/', auth, getTables);
router.get('/:id', auth, getTable);
router.delete('/:id', auth, deleteTable);

export default router;