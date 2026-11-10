import { z } from 'zod';

// "" ou null viram undefined (formulários costumam mandar string vazia)
export const opt = (schema) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema.optional());

// aceita número ou string numérica ("-25.7")
export const num = (min, max) =>
  z.preprocess(
    (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
    z.number().min(min).max(max),
  );

export const idParam = z.object({ id: z.coerce.number().int().positive() });
export const email = z.string().trim().toLowerCase().email('E-mail inválido');
export const telefone = z.string().trim().min(8, 'Telefone inválido').max(30);
export const nome = z.string().trim().min(2).max(100);
