import { AppError } from '../lib/AppError.js';
import { verifyToken } from '../lib/jwt.js';

// Protege as rotas do Portal Restrito: exige "Authorization: Bearer <token>" de admin.
export function requireAdmin(req, res, next) {
  try {
    const [type, token] = (req.headers.authorization || '').split(' ');
    if (type !== 'Bearer' || !token) throw new AppError('Token não informado', 401);
    const payload = verifyToken(token);
    if (payload.role !== 'ADMIN') throw new AppError('Acesso negado', 403);
    req.admin = { email: payload.email };
    next();
  } catch (e) {
    next(e);
  }
}
