import { prisma } from '../db/prisma';

export const getUsuarios = async () => {
  return await prisma.usuario.findMany();
};
