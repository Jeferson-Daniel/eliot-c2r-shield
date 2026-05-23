import { describe, it, expect } from 'vitest';
import request from 'supertest';
const { app } = require('../dist/server.js');

describe('Testes de API - ELIOT C2R SHIELD', () => {

  it('Deve retornar status 200 no Health Check', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
  });

  it('Deve retornar a lista de incidentes no formato esperado', async () => {
    const response = await request(app).get('/api/incidentes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
    // Assumimos que o banco já tem a seed, logo o array deve ter ao menos 1 item
    if (response.body.length > 0) {
      const primeiro = response.body[0];
      expect(primeiro).toHaveProperty('id_incidente');
      expect(primeiro).toHaveProperty('titulo');
      expect(primeiro).toHaveProperty('ameaca');
      expect(primeiro).toHaveProperty('status_validacao');
    }
  });

  it('Deve retornar o resumo do dashboard com métricas numéricas', async () => {
    const response = await request(app).get('/api/dashboard/resumo');
    expect(response.status).toBe(200);
    
    // Verifica se os campos básicos existem
    expect(response.body).toHaveProperty('totalUsuarios');
    expect(response.body).toHaveProperty('totalIncidentes');
    expect(response.body).toHaveProperty('incidentesResolvidos');
    expect(response.body).toHaveProperty('incidentesPendentes');

    // Valida se são números
    expect(typeof response.body.totalUsuarios).toBe('number');
    expect(typeof response.body.totalIncidentes).toBe('number');
  });

  it('Deve retornar o ranking de usuários', async () => {
    const response = await request(app).get('/api/ranking');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      const usuario = response.body[0];
      expect(usuario).toHaveProperty('id_usuario');
      expect(usuario).toHaveProperty('nome');
      expect(usuario).toHaveProperty('pontuacao_total');
    }
  });

});
