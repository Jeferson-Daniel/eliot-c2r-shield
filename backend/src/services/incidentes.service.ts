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
  const maxInc = await prisma.incidente.aggregate({
    _max: { id_incidente: true }
  });
  const nextId = (maxInc._max.id_incidente || 0) + 1;
  return await prisma.incidente.create({
    data: {
      ...data,
      id_incidente: nextId
    }
  });
};

export const updateIncidenteStatus = async (id: number, status: string) => {
  return await prisma.incidente.update({
    where: { id_incidente: id },
    data: { status_validacao: status }
  });
};