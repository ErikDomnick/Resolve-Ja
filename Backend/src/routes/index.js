import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import userRoutes from './userRoutes.js';
import ocorrenciaRoutes from './ocorrenciaRoutes.js';
import relatorioRoutes from './relatorioRoutes.js';

const router = Router();
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);
router.use('/ocorrencias', ocorrenciaRoutes);
router.use('/relatorios', relatorioRoutes);
export default router;
