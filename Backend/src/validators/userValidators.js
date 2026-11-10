import { z } from 'zod';
import { email, telefone, nome } from './common.js';

export const createUserSchema = z.object({ nome, email, telefone });

export const updateUserSchema = z.object({
  nome: nome.optional(),
  email: email.optional(),
  telefone: telefone.optional(),
});
