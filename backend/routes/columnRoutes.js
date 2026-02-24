import {createColumns, getColumns} from '../controllers/columnController.js';
import auth from '../middleware/authMiddleware.js'
import express from 'express';
const router = express.Router();


router.post('/:tableId', auth, createColumns);
router.get('/:tableId', auth, getColumns);

export default router;