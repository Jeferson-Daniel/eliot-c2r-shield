import { Request, Response } from 'express';
import { getDashboardResumo } from '../services/dashboard.service';

export const getResumo = async (req: Request, res: Response) => {
  try {
    const resumo = await getDashboardResumo();
    res.json(resumo);
  } catch (error) {
    console.error('Erro ao buscar resumo do dashboard:', error);
    res.status(500).json({ error: 'Erro ao buscar resumo do dashboard' });
  }
};
