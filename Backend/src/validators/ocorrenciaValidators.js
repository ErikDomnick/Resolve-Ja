import { z } from 'zod';
import { STATUS, PRIORIDADES } from '../lib/constants.js';
import { opt, num, email, telefone, nome } from './common.js';

const categoria = z.string().trim().min(2).max(60);
const descricao = z.string().trim().min(10, 'Descreva melhor o problema').max(2000);
// imagem pode ser URL ou data URL (base64) enviada pelo front
const imagem = z.string().trim().max(2_000_000);

// Relatar ocorrência: não exige cadastro, mas pede os dados de contato
export const criarOcorrenciaSchema = z.object({
  nome,
  email,
  telefone,
  descricao,
  categoria,
  latitude: num(-90, 90),
  longitude: num(-180, 180),
  imagem: opt(imagem),
});

// Edição pela equipe administrativa
export const atualizarOcorrenciaSchema = z.object({
  descricao: descricao.optional(),
  categoria: categoria.optional(),
  prioridade: z.enum(PRIORIDADES).optional(),
  status: z.enum(STATUS).optional(),
  latitude: num(-90, 90).optional(),
  longitude: num(-180, 180).optional(),
  imagem: opt(imagem),
});

export const listarOcorrenciasQuery = z.object({
  status: opt(z.enum(STATUS)),
  prioridade: opt(z.enum(PRIORIDADES)),
  categoria: opt(z.string().trim()),
  userId: opt(z.coerce.number().int().positive()),
  search: opt(z.string().trim()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const acompanharQuery = z.object({ email });
