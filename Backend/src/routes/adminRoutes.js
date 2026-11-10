import { Router } from 'express';
import * as c from '../controllers/adminController.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema } from '../validators/adminValidators.js';

const router = Router();
router.post('/login', validate({ body: loginSchema }), c.login);
export default router;
