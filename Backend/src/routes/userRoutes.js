import { Router } from 'express';
import * as c from '../controllers/userController.js';

const router = Router();
router.get('/', c.index);
router.get('/:id', c.show);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);
export default router;