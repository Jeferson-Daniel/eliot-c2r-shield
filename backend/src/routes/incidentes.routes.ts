import { Router } from 'express';
import { listIncidentes, getIncidente } from '../controllers/incidentes.controller';

const incidentesRouter = Router();

incidentesRouter.get('/', listIncidentes);
incidentesRouter.get('/:id', getIncidente);

export { incidentesRouter };
