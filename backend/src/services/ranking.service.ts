import { prisma } from '../db/prisma';

export const getRanking = async () => {
  return await prisma.usuario.findMany({
    orderBy: {
      pontuacao_total: 'desc'
    },
    select: {
      id_usuario: true,
      matricula: true,
      nome: true,
      cargo: true,
      pontuacao_total: true,
      data_cadastro: true
    }
  });
};
