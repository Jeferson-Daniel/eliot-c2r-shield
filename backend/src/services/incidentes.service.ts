import { prisma } from '../db/prisma';

export const getIncidentes = async () => {
  return await prisma.incidente.findMany({
    include: {
      usuario_incidente_id_usuario_relatorTousuario: {
        select: {
          id_usuario: true,
          nome: true,
          cargo: true,
          matricula: true
        }
      }
    }
  });
};

export const getIncidenteById = async (id: number) => {
  return await prisma.incidente.findUnique({
    where: { id_incidente: id },
  });
};

export const createIncidente = async (data: any) => {
  return await prisma.incidente.create({ data });
};