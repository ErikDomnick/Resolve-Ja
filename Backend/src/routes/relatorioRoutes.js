import { Router } from 'express';
import * as c from '../controllers/relatorioController.js';
import { requireAdmin } from '../middlewares/auth.js';

const router = Router();
router.get('/resumo', requireAdmin, c.resumo);
export default router;
