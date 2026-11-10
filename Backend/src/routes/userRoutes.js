import { Router } from 'express';
import * as c from '../controllers/userController.js';
import { requireAdmin } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { idParam } from '../validators/common.js';
import { createUserSchema, updateUserSchema } from '../validators/userValidators.js';

const router = Router();
router.use(requireAdmin);

router.get('/', c.index);
router.get('/:id', validate({ params: idParam }), c.show);
router.post('/', validate({ body: createUserSchema }), c.create);
router.put('/:id', validate({ params: idParam, body: updateUserSchema }), c.update);
router.delete('/:id', validate({ params: idParam }), c.remove);
export default router;
