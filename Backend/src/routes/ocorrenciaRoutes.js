import { Router } from 'express';
import * as c from '../controllers/ocorrenciaController.js';
import { requireAdmin } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { idParam } from '../validators/common.js';
import {
  criarOcorrenciaSchema,
  atualizarOcorrenciaSchema,
  listarOcorrenciasQuery,
  acompanharQuery,
} from '../validators/ocorrenciaValidators.js';

const router = Router();

// Público (relatar não exige cadastro)
router.post('/', validate({ body: criarOcorrenciaSchema }), c.create);
router.get('/:id/acompanhar', validate({ params: idParam, query: acompanharQuery }), c.acompanhar);

// Portal Restrito
router.get('/', requireAdmin, validate({ query: listarOcorrenciasQuery }), c.index);
router.get('/:id', requireAdmin, validate({ params: idParam }), c.show);
router.put('/:id', requireAdmin, validate({ params: idParam, body: atualizarOcorrenciaSchema }), c.update);
router.delete('/:id', requireAdmin, validate({ params: idParam }), c.remove);
export default router;
