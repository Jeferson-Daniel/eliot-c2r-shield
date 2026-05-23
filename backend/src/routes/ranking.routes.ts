import { Router } from 'express';
import { listRanking } from '../controllers/ranking.controller';

const router = Router();

router.get('/', listRanking);

export default router;
