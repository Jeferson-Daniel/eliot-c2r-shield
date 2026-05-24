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

export const createIncidente = async (req: Request, res: Response) => {
  try {
    const { titulo, descricao, ameaca, link_suspeito, id_usuario_relator } = req.body;
    
    if (!titulo || !descricao || !ameaca || !id_usuario_relator) {
      res.status(400).json({ error: 'Campos obrigatórios ausentes' });
      return;
    }

    const newIncidente = await IncidentesService.createIncidente({
      titulo,
      descricao,
      ameaca,
      link_suspeito,
      id_usuario_relator: Number(id_usuario_relator),
      status_validacao: "Em análise",
      pontos_atribuidos: 0,
      // Temporário: documentado conforme instrução de não autenticação
    });

    res.status(201).json(newIncidente);
  } catch (error: any) {
    console.error("Erro Prisma POST /incidentes:", error);
    res.status(500).json({ error: 'Erro ao criar incidente', details: error.message, stack: error.stack });
  }
};
