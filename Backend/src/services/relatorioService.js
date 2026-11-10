import { prisma } from '../lib/prisma.js';
import { STATUS, PRIORIDADES } from '../lib/constants.js';

const DIA = 24 * 60 * 60 * 1000;

const contar = (chaves, linhas, campo) => {
  const out = Object.fromEntries(chaves.map((k) => [k, 0]));
  linhas.forEach((l) => (out[l[campo]] = l._count._all));
  return out;
};

export async function resumo() {
  const desde = new Date(Date.now() - 30 * DIA);

  const [total, ultimos30Dias, porStatus, porPrioridade, porCategoria, usuarios] = await Promise.all([
    prisma.ocorrencia.count(),
    prisma.ocorrencia.count({ where: { createdAt: { gte: desde } } }),
    prisma.ocorrencia.groupBy({ by: ['status'], _count: { _all: true } }),
    prisma.ocorrencia.groupBy({ by: ['prioridade'], _count: { _all: true } }),
    prisma.ocorrencia.groupBy({ by: ['categoria'], _count: { _all: true } }),
    prisma.user.count(),
  ]);

  return {
    total,
    ultimos30Dias,
    usuarios,
    porStatus: contar(STATUS, porStatus, 'status'),
    porPrioridade: contar(PRIORIDADES, porPrioridade, 'prioridade'),
    porCategoria: porCategoria
      .map((c) => ({ categoria: c.categoria, total: c._count._all }))
      .sort((a, b) => b.total - a.total),
  };
}
