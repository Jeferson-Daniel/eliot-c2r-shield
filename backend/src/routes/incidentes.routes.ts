import { Router } from 'express';
import { listIncidentes, getIncidente, createIncidente } from '../controllers/incidentes.controller';

const incidentesRouter = Router();

incidentesRouter.get('/', listIncidentes);
incidentesRouter.post('/', createIncidente);
incidentesRouter.get('/:id', getIncidente);

export { incidentesRouter };
