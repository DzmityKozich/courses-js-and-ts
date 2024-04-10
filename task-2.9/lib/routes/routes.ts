import express from 'express';
import { createHandler, deleteHandler, getAllHandler, getByIdHandler, updateHandler } from '../handlers/handlers';

const router = express.Router();

router.get('/todo', getAllHandler);
router.get('/todo/:id', getByIdHandler);
router.post('/todo', createHandler);
router.post('/todo/update', updateHandler);
router.delete('/todo/:id', deleteHandler);

export default router;
