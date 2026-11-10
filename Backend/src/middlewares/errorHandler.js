import { ZodError } from 'zod';
import { AppError } from '../lib/AppError.js';

export function notFound(req, res) {
  res.status(404).json({ error: 'Rota não encontrada' });
}

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: err.issues.map((i) => ({ campo: i.path.join('.'), mensagem: i.message })),
    });
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON inválido' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Requisição muito grande (imagem?)' });
  if (err.code === 'P2002') return res.status(409).json({ error: 'Registro já existe' });
  if (err.code === 'P2025') return res.status(404).json({ error: 'Registro não encontrado' });
  if (err.code === 'P2003') {
    return res.status(409).json({ error: 'Operação bloqueada: existem registros relacionados' });
  }
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
}
