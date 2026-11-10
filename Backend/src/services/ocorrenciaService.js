import { prisma } from '../lib/prisma.js';
import { AppError } from '../lib/AppError.js';

const comUser = { user: { select: { id: true, nome: true, email: true, telefone: true } } };

// Relatar: acha o usuário pelo e-mail (ou cria) e registra a ocorrência.
// Se o e-mail já existe, os dados dele não são sobrescritos (evita alguém trocar
// nome/telefone de outra pessoa só digitando o e-mail dela).
export async function criar({ nome, email, telefone, ...dados }) {
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { nome, email, telefone },
  });
  return prisma.ocorrencia.create({ data: { ...dados, userId: user.id }, include: comUser });
}

export async function listar({ page, limit, search, ...filtros }) {
  const where = { ...filtros };
  if (search) where.descricao = { contains: search };

  const [data, total] = await Promise.all([
    prisma.ocorrencia.findMany({
      where,
      include: comUser,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.ocorrencia.count({ where }),
  ]);
  return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
}

export async function buscar(id) {
  const o = await prisma.ocorrencia.findUnique({ where: { id }, include: comUser });
  if (!o) throw new AppError('Ocorrência não encontrada', 404);
  return o;
}

// Consulta pública: o número da ocorrência + o e-mail usado no relato
export async function acompanhar(id, email) {
  const o = await prisma.ocorrencia.findUnique({ where: { id }, include: comUser });
  if (!o || o.user.email !== email) throw new AppError('Ocorrência não encontrada', 404);
  const { id: numero, categoria, descricao, status, prioridade, createdAt } = o;
  return { id: numero, categoria, descricao, status, prioridade, createdAt };
}

export const atualizar = (id, data) =>
  prisma.ocorrencia.update({ where: { id }, data, include: comUser });

export const remover = (id) => prisma.ocorrencia.delete({ where: { id } });
