import { prisma } from '../lib/prisma.js';

export const listUsers = () => prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
export const getUserById = (id) => prisma.user.findUnique({ where: { id } });
export const createUser = (data) => prisma.user.create({ data });
export const updateUser = (id, data) => prisma.user.update({ where: { id }, data });
export const deleteUser = (id) => prisma.user.delete({ where: { id } });