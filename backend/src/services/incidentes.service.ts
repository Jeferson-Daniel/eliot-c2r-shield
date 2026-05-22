import { prisma } from '../db/prisma';

export const getIncidentes = async () => {
  return await prisma.incidente.findMany();
};

export const getIncidenteById = async (id: number) => {
  return await prisma.incidente.findUnique({
    where: { id_incidente: id },
  });
};

export const createIncidente = async (data: any) => {
  return await prisma.incidente.create({ data });
};