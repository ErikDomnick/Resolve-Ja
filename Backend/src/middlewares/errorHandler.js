export function errorHandler(err, req, res, next) {
  if (err.code === 'P2002') return res.status(409).json({ error: 'Registro já existe' });
  if (err.code === 'P2025') return res.status(404).json({ error: 'Registro não encontrado' });
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
}