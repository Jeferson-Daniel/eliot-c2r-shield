import { Router } from 'express';
import { getResumo } from '../controllers/dashboard.controller';

const router = Router();

router.get('/resumo', getResumo);

export default router;
