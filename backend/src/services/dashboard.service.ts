import { prisma } from '../db/prisma';

export const getDashboardResumo = async () => {
  const totalUsuarios = await prisma.usuario.count();
  const totalIncidentes = await prisma.incidente.count();
  
  const incidentesPendentes = await prisma.incidente.count({
    where: {
      status_validacao: 'Pendente'
    }
  });

  const incidentesResolvidos = await prisma.incidente.count({
    where: {
      status_validacao: {
        not: 'Pendente'
      }
    }
  });

  return {
    totalUsuarios,
    totalIncidentes,
    incidentesResolvidos,
    incidentesPendentes
  };
};
