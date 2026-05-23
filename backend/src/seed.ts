import 'dotenv/config';
import { prisma } from './db/prisma';

async function main() {
  console.log('Iniciando seed com dados ricos do frontend...');

  // Limpeza na ordem correta
  await prisma.usuario_insignia.deleteMany();
  await prisma.anexo_incidente.deleteMany();
  await prisma.incidente.deleteMany();
  await prisma.insignia.deleteMany();
  await prisma.usuario.deleteMany();

  // 1. Usuários
  const usersData = [
    { id_usuario: 1, nome: 'Paulo Anjos', matricula: '2020101', cargo: 'Técnico CTIC', pontuacao_total: 4350 },
    { id_usuario: 2, nome: 'José Haroldo', matricula: '1998002', cargo: 'Servidor', pontuacao_total: 9400 },
    { id_usuario: 3, nome: 'Felipe Carvalho', matricula: '2024103', cargo: 'Discente', pontuacao_total: 9380 },
    { id_usuario: 4, nome: 'Lara Glória', matricula: '2015004', cargo: 'Docente', pontuacao_total: 9380 },
    { id_usuario: 5, nome: 'Maria Eduarda', matricula: '2022105', cargo: 'Discente', pontuacao_total: 9280 },
    { id_usuario: 6, nome: 'Raimundo Júnior', matricula: '2001006', cargo: 'Servidor', pontuacao_total: 9250 },
    { id_usuario: 7, nome: 'Ediane Bó', matricula: '2012007', cargo: 'Docente', pontuacao_total: 8000 },
    { id_usuario: 8, nome: 'Ana Clara', matricula: '2023108', cargo: 'Discente', pontuacao_total: 7896 },
  ];

  await prisma.usuario.createMany({ data: usersData });

  // 2. Insígnias
  const badgesData = [
    { id_insignia: 1, titulo_insignia: 'Primeiro Reporte', caminho_icone: '/icons/primeiro-reporte.png', pontuacao_necessaria: 100 },
    { id_insignia: 2, titulo_insignia: 'Caçador de Phishing', caminho_icone: '/icons/cacador-phishing.png', pontuacao_necessaria: 500 },
    { id_insignia: 3, titulo_insignia: 'Alerta Preventivo', caminho_icone: '/icons/alerta-preventivo.png', pontuacao_necessaria: 1500 },
    { id_insignia: 4, titulo_insignia: 'Referência Institucional', caminho_icone: '/icons/referencia.png', pontuacao_necessaria: 10000 },
    { id_insignia: 5, titulo_insignia: 'Análise Criteriosa', caminho_icone: '/icons/analise.png', pontuacao_necessaria: 4000 },
  ];

  await prisma.insignia.createMany({ data: badgesData });

  // 3. Usuário-Insígnia
  await prisma.usuario_insignia.createMany({
    data: [
      { id_usuario: 1, id_insignia: 1 },
      { id_usuario: 1, id_insignia: 2 },
      { id_usuario: 2, id_insignia: 1 },
      { id_usuario: 2, id_insignia: 4 },
      { id_usuario: 3, id_insignia: 1 },
      { id_usuario: 3, id_insignia: 3 },
      { id_usuario: 4, id_insignia: 1 },
      { id_usuario: 5, id_insignia: 1 },
    ]
  });

  // Helper para datas
  const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);

  // 4. Incidentes
  const incidentsData = [
    {
      id_incidente: 1,
      titulo: 'E-mail suspeito solicitando senha',
      descricao: 'E-mail falso solicitando renovação de credenciais institucionais fingindo ser a coordenação.',
      ameaca: 'Phishing',
      status_validacao: 'Validado',
      pontos_atribuidos: 150,
      id_usuario_relator: 1,
      id_usuario_validador: 2,
      data_criacao: daysAgo(5),
    },
    {
      id_incidente: 2,
      titulo: 'Anexo .exe em mensagem institucional',
      descricao: 'Anexo malicioso (.exe) simulando boleto de matrícula/taxa da universidade.',
      ameaca: 'Malware',
      status_validacao: 'Em análise',
      pontos_atribuidos: 0,
      id_usuario_relator: 3,
      data_criacao: daysAgo(2),
    },
    {
      id_incidente: 3,
      titulo: 'Página falsa do SIGAA',
      descricao: 'Identifiquei um site falso do SIGAA pedindo login na rede Wi-Fi da biblioteca.',
      link_suspeito: 'https://sigaa-renovacao-institucional.net',
      ameaca: 'Link suspeito',
      status_validacao: 'Concluído',
      pontos_atribuidos: 200,
      id_usuario_relator: 2,
      id_usuario_validador: 1,
      data_criacao: daysAgo(10),
    },
    {
      id_incidente: 4,
      titulo: 'Arquivo com vírus no Drive compartilhado',
      descricao: 'Planilha com dados e CPFs de alunos aberta no Google Drive contendo um script malicioso oculto.',
      link_suspeito: 'https://docs.google.com/spreadsheets/d/public-share',
      ameaca: 'Vazamento de dados',
      status_validacao: 'Pendente',
      pontos_atribuidos: 0,
      id_usuario_relator: 4,
      data_criacao: daysAgo(1),
    },
    {
      id_incidente: 5,
      titulo: 'Site clonado da biblioteca',
      descricao: 'URL estranha divulgada em grupos do Whatsapp passando-se pelo portal de periódicos.',
      ameaca: 'Engenharia social',
      status_validacao: 'Validado',
      pontos_atribuidos: 100,
      id_usuario_relator: 5,
      id_usuario_validador: 2,
      data_criacao: daysAgo(4),
    },
    {
      id_incidente: 6,
      titulo: 'QR Code suspeito no mural',
      descricao: 'Cartaz colado no mural oferecendo vagas de estágio com um QR Code que baixa um APK suspeito.',
      ameaca: 'Outro',
      status_validacao: 'Rejeitado',
      pontos_atribuidos: 0,
      id_usuario_relator: 6,
      id_usuario_validador: 1,
      data_criacao: daysAgo(8),
    },
    {
      id_incidente: 7,
      titulo: 'Tentativa de acesso bloqueada',
      descricao: 'Múltiplas tentativas de login no portal docente oriundas de um IP externo durante a madrugada.',
      ameaca: 'Acesso indevido',
      status_validacao: 'Concluído',
      pontos_atribuidos: 50,
      id_usuario_relator: 7,
      id_usuario_validador: 1,
      data_criacao: daysAgo(12),
    },
    {
      id_incidente: 8,
      titulo: 'Link encurtado recebido por WhatsApp',
      descricao: 'Link encurtado suspeito enviado no grupo oficial do curso fingindo ser a lista de presença.',
      link_suspeito: 'https://bit.ly/matricula-urgente',
      ameaca: 'Link suspeito',
      status_validacao: 'Em análise',
      pontos_atribuidos: 0,
      id_usuario_relator: 8,
      data_criacao: daysAgo(0),
    }
  ];

  await prisma.incidente.createMany({ data: incidentsData });

  // 5. Anexo Incidente
  await prisma.anexo_incidente.create({
    data: {
      id_anexo: 1,
      id_incidente: 2,
      caminho_arquivo_storage: '/storage/incidentes/evidencia_boleto.png',
      hash_md5_arquivo: 'a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7'
    }
  });

  console.log('Seed rico e realista concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
