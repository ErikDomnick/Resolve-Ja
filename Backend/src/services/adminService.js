import { createHash, timingSafeEqual } from 'node:crypto';
import { AppError } from '../lib/AppError.js';
import { signAdminToken } from '../lib/jwt.js';

const digest = (v) => createHash('sha256').update(String(v)).digest();
const safeEqual = (a, b) => timingSafeEqual(digest(a), digest(b));

// A equipe administrativa é definida no .env (ADMIN_EMAIL / ADMIN_PASSWORD).
export function login({ email, password }) {
  const okEmail = safeEqual(email, process.env.ADMIN_EMAIL.toLowerCase());
  const okSenha = safeEqual(password, process.env.ADMIN_PASSWORD);
  if (!(okEmail && okSenha)) throw new AppError('E-mail ou senha inválidos', 401);
  return { token: signAdminToken(email), admin: { email } };
}
