import { Request, Response } from 'express';
import * as UsuariosService from '../services/usuarios.service';

export const listUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await UsuariosService.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};
