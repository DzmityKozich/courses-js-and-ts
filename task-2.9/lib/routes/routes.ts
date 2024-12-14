import express from 'express';
import { Handler } from '../handlers/handler';

const router = express.Router();

const handler = new Handler();

router.get('/todo', handler.getAll);
router.get('/todo/:id', handler.getById);
router.post('/todo', handler.create);
router.post('/todo/update', handler.update);
router.delete('/todo/:id', handler.delete);

export default router;
