const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  async getRanking() {
    try {
      const response = await fetch(`${API_URL}/ranking`);
      if (!response.ok) {
        throw new Error('Falha ao buscar ranking');
      }
      const data = await response.json();
      
      // Mapear o formato do backend para o formato do AppUser do frontend
      return data.map((user: any) => ({
        id: String(user.id_usuario),
        name: user.nome,
        role: user.cargo,
        avatarSeed: user.nome.toLowerCase().replace(/\s+/g, ''),
        xp: user.pontuacao_total || 0,
        badges: []
      }));
    } catch (error) {
      console.error('Erro na API getRanking:', error);
      throw error;
    }
  },

  async getDashboardResumo() {
    try {
      const response = await fetch(`${API_URL}/dashboard/resumo`);
      if (!response.ok) throw new Error('Falha ao buscar resumo');
      return await response.json();
    } catch (error) {
      console.error('Erro na API getDashboardResumo:', error);
      throw error;
    }
  },

  async getIncidentes() {
    try {
      const response = await fetch(`${API_URL}/incidentes`);
      if (!response.ok) throw new Error('Falha ao buscar incidentes');
      return await response.json();
    } catch (error) {
      console.error('Erro na API getIncidentes:', error);
      throw error;
    }
  },

  async getUsuarios() {
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      if (!response.ok) throw new Error('Falha ao buscar usuarios');
      return await response.json();
    } catch (error) {
      console.error('Erro na API getUsuarios:', error);
      throw error;
    }
  }
};
