import { Router } from 'express';
import { listUsuarios } from '../controllers/usuarios.controller';

const usuariosRouter = Router();

usuariosRouter.get('/', listUsuarios);

export { usuariosRouter };
