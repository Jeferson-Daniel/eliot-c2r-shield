import { Request, Response } from 'express';
import * as IncidentesService from '../services/incidentes.service';

export const listIncidentes = async (req: Request, res: Response) => {
  try {
    const incidentes = await IncidentesService.getIncidentes();
    res.json(incidentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar incidentes' });
  }
};

export const getIncidente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const incidente = await IncidentesService.getIncidenteById(Number(id));
    if (!incidente) {
      res.status(404).json({ error: 'Incidente não encontrado' });
      return;
    }
    res.json(incidente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar incidente' });
  }
};
