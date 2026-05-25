import { Router } from 'express';
import { listIncidentes, getIncidente, createIncidente, updateStatus } from '../controllers/incidentes.controller';

const incidentesRouter = Router();

incidentesRouter.get('/', listIncidentes);
incidentesRouter.post('/', createIncidente);
incidentesRouter.get('/:id', getIncidente);
incidentesRouter.put('/:id/status', updateStatus);

export { incidentesRouter };
