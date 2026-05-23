import { Request, Response } from 'express';
import { getRanking } from '../services/ranking.service';

export const listRanking = async (req: Request, res: Response) => {
  try {
    const ranking = await getRanking();
    res.json(ranking);
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    res.status(500).json({ error: 'Erro ao buscar ranking' });
  }
};
