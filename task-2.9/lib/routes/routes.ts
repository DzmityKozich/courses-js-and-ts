import express from 'express';
import { getAllHandler } from '../handlers/handlers';

const router = express.Router();

router.get('/', getAllHandler);

export default router;
