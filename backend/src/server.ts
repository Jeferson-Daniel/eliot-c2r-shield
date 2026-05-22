import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health.routes';
import { usuariosRouter } from './routes/usuarios.routes';
import { incidentesRouter } from './routes/incidentes.routes';
import dashboardRouter from './routes/dashboard.routes';
import rankingRouter from './routes/ranking.routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/incidentes', incidentesRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/ranking', rankingRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
